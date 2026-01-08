require('dotenv').config();
const { GoogleGenerativeAI } = require('@google/generative-ai');
const axios = require('axios');
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

async function getSummaryFromGemini(articles, apiKey) {
    const genAI = new GoogleGenerativeAI(apiKey);
    // Changed to Gemini 2.0 Flash (experimental) as requested by user
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-exp' });

    const topNews = articles.map(article => ({
        title: article.title,
        summary: article.description || article.content || ''
    }));

    const prompt = `
    You are a tech expert assistant. Summarize the following news concisely and professionally in English.
    Focus on the most relevant information.

    News:
    ${topNews.map((n, i) => `${i + 1}. Title: ${n.title}\nContent: ${n.summary}`).join('\n\n')}

    Final summary:
  `;

    try {
        const result = await model.generateContent(prompt);
        const response = await result.response;
        return response.text();
    } catch (error) {
        if (error.message.includes('404')) {
            console.error('Error 404: The requested model was not found.');
            console.log('Attempting to list available models...');
        }
        throw error;
    }
}

app.get('/api/news-summary', async (req, res) => {
    try {
        console.log('--- New request: Summarizing news ---');

        const geminiKey = process.env.GEMINI_API_KEY;
        const newsApiKey = process.env.NEWS_API_KEY;

        if (!geminiKey || !newsApiKey) {
            return res.status(500).json({ error: 'Incomplete API Key configuration on server.' });
        }

        console.log('Fetching tech news from NewsAPI...');
        const responseNews = await axios.get('https://newsapi.org/v2/top-headlines', {
            params: {
                category: 'technology',
                language: 'en',
                apiKey: newsApiKey,
                pageSize: 5
            }
        });

        const articles = responseNews.data.articles || [];
        const newsCount = articles.length;
        console.log(`Number of news articles found: ${newsCount}`);

        if (newsCount === 0) {
            return res.json({
                success: true,
                message: 'No relevant news found.',
                articles: [],
                summary: 'No tech news available at this time.'
            });
        }

        console.log('Generating summary with Gemini AI...');
        const summary = await getSummaryFromGemini(articles, geminiKey);

        console.log('Connected correctly and data sent to client.');

        res.json({
            success: true,
            newsCount: newsCount,
            summary: summary,
            articles: articles.map(a => ({
                id: a.url, // Use URL as unique ID
                title: a.title,
                source: a.source ? a.source.name : 'Unknown Source',
                date: new Date(a.publishedAt).toLocaleDateString(),
                summary: a.description || a.content || 'No content available',
                url: a.url
            }))
        });

    } catch (error) {
        console.error('Server error:', error.message);
        res.status(500).json({ error: 'An error occurred while processing the news.' });
    }
});

app.listen(PORT, () => {
    console.log(`\n--- Global News Hub Server Started ---`);
    console.log(`Local URL: http://localhost:${PORT}`);

    const geminiStatus = process.env.GEMINI_API_KEY ? '✅ CONNECTED' : '❌ NOT CONFIGURED';
    const newsApiStatus = process.env.NEWS_API_KEY ? '✅ CONNECTED' : '❌ NOT CONFIGURED';

    console.log(`AI Status (Gemini): ${geminiStatus}`);
    console.log(`NewsAPI Status: ${newsApiStatus}`);
    console.log('------------------------------------------\n');
});

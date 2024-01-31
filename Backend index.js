const express = require('express');
const app = express();
const cors = require('cors');
const fs = require('fs').promises;

const PORT = 5000;
const PRODUCTS_FILE_PATH = './products.json';

app.use(express.json());
app.use(cors());

app.get('/api/products', async (req, res) => {
  try {
    const data = await getDataFromFile();
    res.json(data);
  } catch (error) {
    console.error('Error reading data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/api/products', async (req, res) => {
  try {
    const { name, price, picture, id } = req.body;

    const data = await getDataFromFile();

    const newProduct = {
      name,
      price,
      picture,
      id,
    };

    data.push(newProduct);
    await fs.writeFile(PRODUCTS_FILE_PATH, JSON.stringify(data, null, 2));
    res.status(201).json(newProduct);
  } catch (error) {
    console.error('Error adding new product:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

async function getDataFromFile() {
  const content = await fs.readFile(PRODUCTS_FILE_PATH, 'utf-8');
  return JSON.parse(content);
}

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

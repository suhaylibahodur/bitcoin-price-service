# Bitcoin Price Microservice

A Node.js microservice that retrieves the current Bitcoin price (bid and ask) from the Binance API.

## How to Run

1. Clone the repository:
   ```bash
   git clone https://github.com/suhaylibahodur/bitcoin-price-service.git
   cd bitcoin-price-service


2. Copy and change file .env.example to .env

3. Build and run the service with Docker:

    ```bash
    docker-compose up --build

4. Access the service at http://localhost:3000/bitcoin-price

5. Stop the service:

    ```bash
    docker-compose down
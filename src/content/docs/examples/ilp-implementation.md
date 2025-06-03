---
title: 'Example implementation - Interledger'
---

This page provides a high-level description of how the <a href="https://interledger.org/developers/get-started/" target="_blank">Interledger Protocol (ILP)</a> has implemented payment pointers. ILP is an open suite of protocols for transferring packets of value across different payment networks and ledgers.

## Interledger's Simple Payment Setup Protocol (SPSP)

Interledger's <a href="https://interledger.org/developers/rfcs/simple-payment-setup-protocol/" target="_blank">SPSP</a> is a protocol used by clients, such as mobile and web apps, to obtain the destination account and shared secret details required to set up an Interledger payment.

The details are obtained via an HTTPS request to an SPSP server endpoint. Interledger uses payment pointers as a user-friendly way to express the endpoint URLs.

### Example: Sending an Interledger payment

You use a payment app to send a payment to a friend. You enter an amount and your friend’s payment pointer into the app. Your friend's payment pointer is `$alice.wallet.example`.

First, the app follows the [syntax and resolution](/syntax) rules to convert the payment pointer to an HTTPS URL. The URL is the endpoint for an SPSP server:

```http
https://alice.wallet.example/.well-known/pay
```

The app queries the URL by sending a `GET` request with a MIME type of `application/spsp4+json` included in the header.

```http title="Example request"
curl --request GET \
 --url https://alice.wallet.example/.well-known/pay \
 --header 'accept: application/spsp4+json'
```

The SPSP server responds with the following connection details.

* `destination_account` - An ILP address, which provides a way to route ILP packets to their intended destination. ILP addresses aren't meant to be user-facing.
* `shared_secret` - A shared secret between the app and the SPSP server.

```json title="Example response" wrap
{
 "destination_account":"example.dev.0.wallet.cloudnine.swx0a0.~ipr.cdfa5e16-e759",
 "shared_secret":"7h0s7EpQDqcgzqmX-mwrNHFHinPvJq8Jw",
},
```

After the app has the destination account and shared secret, it no longer needs the payment pointer. The next step is for the app to use the details to set up a <a href="https://interledger.org/developers/rfcs/stream-protocol/" target="_blank">STREAM</a> connection. STREAM is Interledger's transport layer protocol that creates and transmits the Interledger packets that make up a payment.

## Interledger and Open Payments

<a href="https://openpayments.dev" target="_blank">Open Payments</a> is an open API standard for implementation by banks, mobile money providers, and other account servicing entities (ASEs). It allows developers to build payment capabilities into their clients by calling Open Payments APIs to issue payment instructions to ASEs without needing custom integrations.

Open Payments is an alternative to Interledger’s SPSP. As such, getting the details needed to set up a payment is done through an Open Payments API call.

While Open Payments doesn’t use SPSP, it does use Interledger’s STREAM protocol. The Open Payments standard is designed so that it can relay payment instructions between transacting parties atop any payment method. However, Interledger is the only method that’s currently integrated with Open Payments.

### Payment pointers and wallet addresses

Instead of payment pointers, the Open Payments standard uses wallet addresses to identify Open Payments-enabled accounts. Wallet addresses are expressed as HTTPS URLs which makes them identical to the URL form of payment pointers. However, wallet addresses resolve to Open Payments API endpoints instead of SPSP server endpoints.

```http title="Example wallet address"
https://wallet.example.com/bob
```

You can query the URL by sending a `GET` request with `application/json` in the header.

```http title="Example request"
curl --request GET \
 --url https://wallet.example.com/bob \
 --header `accept: application/json`
```

You can also use `application/spsp4+json` since Open Payments uses Interledger as its payment method, but in either case you'll receive an Open Payments response.

```json title="Example response"
{
  "id": "https://wallet.example.com/bob",
  "publicName": "Bob",
  "assetCode": "USD",
  "assetScale": 2,
  "authServer": "https://auth.wallet.example.com",
  "resourceServer": "https://wallet.example.com",
}
```

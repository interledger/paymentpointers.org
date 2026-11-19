---
title: About
---

This payment pointers specification is published by the <a href="https://interledger.org" target="_blank">Interledger Community Group</a> at <a href="https://w3.org" target="_blank">W3C</a>.

## Design goals

Payment pointers are designed with very specific goals in mind.

### Unique and easily recognizable

Various standardized and defacto-standardized identifiers are widely used on the Internet today, such as email addresses and social media handles. Payment pointers must be obviously unique so that they aren't confused with another type of identifier and also so that other identifiers aren't assumed to be payment pointers.

### Simple transcription

It should be easy for someone to exchange their payment pointer with a counterparty by saying it, writing it down, or sending it in a digital message.

### Flexible

Payment pointers shouldn't be tightly coupled to a specific payment service. It should be possible for any new payment service to leverage payment pointers by implementing Interledger's <a href="https://interledger.org/developers/rfcs/simple-payment-setup-protocol/" target="_blank">Simple Payment Setup Protocol</a>.

### Widely usable

It should be simple for individuals or small companies to host their own payment service endpoints at a URL that can resolve via a simple and easily recognizable payment pointer. Likewise, it should be possible for a payment services provider to host payment service endpoints for multiple entities without the risk of hosting them at endpoint URLs that conflict with their other services. To that end, the provider should have the option of hosting different endpoints under the same domain and a different path or at a different sub-domain for each user.

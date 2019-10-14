---
layout: page
title: Payment Initiation Services
permalink: /payment-services/
nav_order: 5
---
## Payment Initiation Services

Payment Pointers resolve to HTTP endpoints for **Payment Initiation Services**. 

In the context of Payment Pointers, a payment initiation service is defined very generically as a service for exchanging payment information between a sender and receiver before executing the payment.

### Examples

* In Europe the new Payment Services Directive II (PSD2) explicitly defines it as an online service which accesses a user’s payment account to initiate the transfer of funds on their behalf with the user’s consent and authentication.

* In the Interledger community an example of a payment initiation service is a server that implements the [Simple Payment Setup Protocol](https://interledger.org/rfcs/0009-simple-payment-setup-protocol/) used to setup an Interledger payment.

* Many proprietary payment initiation services exist that operate closed-loop payment networks and have Web-based payment initiation pages. These are only usable if the payer and payee are both participants in the network:
  - [Paypal](https://paypal.me): https://www.paypal.me/youraccount
  - [Square's Cash App](https://cash.app): https://cash.app/$yourcashtag

### Payment Methods

Different payment initiation services will support different payment methods and have different levels of support by counter-parties. 

For Payment Pointers to be usable as a universal pointer to a payment initiation service that is guaranteed to be usable by the counter-party it is necessary to define some minimum requirements of payment initiation services and some mechanisms for payment method discovery and negotiation.

### Discovery

Payment Pointers resolve to URLs so it is possible to leverage standard features of the Web and HTTP to discover the available payment methods at a payment initiation service endpoint location.

As described in the [flow](/flow), clients specify the methods they support through the list of accepted content types they supply in the `Accept` header sent in their initial request to the URL.

The payment initiation service can provide URLs for any alternative protocols it supports through `Link` headers in the response.

### Registry

The payment methods are identified using Content Types and the following payment methods are know to support initiation via a Payment Pointer:

| Protocol | Content Type | Reference |
|----------|-----------|-----------|
| Simple Payment Setup Protocol | `application/spsp4+json` | https://interledger.org/rfcs/0009-simple-payment-setup-protocol/ |

### Requirements

Payment Pointers MUST resolve to an https URL as defined in [RFC7230](https://tools.ietf.org/html/rfc7230#section-2.7.2). It MUST accept HTTP GET requests to initiate the payment.

To be compatible with Payment Pointers a payment initiation service needs to define a unique MIME type that differentiates it from other services. This allows the client to discover available payment methods and initiate the payment using a method that it supports.

Generic types like `text/html` as returned by services like Paypal.me and Square's Cash.app don't provide sufficient differentiating data for the client to determine if the method is supported.

Clients MAY use a combination of the origin of the service and the content type to infer the payment method.

Clients MUST support HTTP redirects as a result of `3XX` responses per [RFC 7231](https://tools.ietf.org/html/rfc7231#section-6.4).

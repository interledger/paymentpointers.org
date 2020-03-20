---
layout: page
title: Flow
permalink: /flow/
nav_order: 3
---
## Flow

When a user wishes to make or receive a payment, and is engaging with a counter-party that is able to process Payment Pointers, it provides a Payment Pointer to the counter-party.

The counter-party's client then uses this Payment Pointer as described below to discover the services and accounts linked to the Payment Pointer and interact with these to send or request a payment.

This is analogous to how a user may provide a credit card number to a merchant to make a payment online, or provide their bank account details to a payer to receive a payment. However, in the case of Payment Pointers the pointer and the services are loosely coupled so a variety of service types could be discovered and payments can be both pushed and pulled from the user's account initiated via the same Payment Pointer.

### Step 1: Resolve Open Payments Server Meta-Data URL

The first step the client performs is to resolve the **Payment Pointer URL** from the Payment Pointer using the [rules](/syntax-resolution) defined in this specification.

To discover the Open Payments service endpoints for interacting with the account, the client extracts the origin from the Payment Pointer URL and appends the path `/.well-known/open-payments` to get the server meta-data document URL. 

If the client is attempting to send an unsolicited payment to the owner of the Payment Pointer (e.g. when sending Web Monetization payments) they may skip fetching the Open Payments server meta-data and immediately fetch STREAM credentials to make the payment from the Payment Pointer URL. 

<div class="mx-auto d-flex" style="flex: 1 100%; flex-wrap: wrap">
  <div class="d-flex" style="flex: 1 auto;">
    <div class="mx-auto" style="flex: 1 100%; flex-wrap: wrap">
      <legend for="pp-input" class="fs-1">Payment Pointer</legend>
      <input class="p-2 fs-4 bg-green-100 text-grey-lt-000" style="width: 95%" type="text" id="pp-input" value="$alice.wallet.example" />
    </div>
    <div class="mx-auto" style="flex: 1 100%; flex-wrap: wrap">
      <legend for="url-input" class="fs-1">URL</legend>
      <input class="p-2 fs-4 bg-green-100 text-grey-lt-000" style="width: 100%" type="text" id="url-input" value="https://alice.wallet.example/.well-known/pay" />
    </div>
  </div>
  <label id="error" class="label label-red mt-2 d-none mx-auto"></label>
</div>

### Step 2: Discover Open Payments Endpoints

The client then uses the HTTP protocol to query the resolved **Open Payments server meta-data** URL and discover the Open Payments services endpoints.

The resolved endpoint MAY redirect the client to another URL but the client MUST ensure it affords the sender an opportunity to verify both the originally resolved and ultimate endpoint hosts.

#### Example:

```http
GET /.well-known/open-payments HTTP/1.1
Host: alice.wallet.example
Accept: application/json
```

### Step 3: Initiate Payment

Having discovered the available endpoints, the client initiates the payment using one of the supported [Open Payments](https://openpayments.dev) protocols appropriate to the use case.

<script src="/assets/js/paymentpointer.js"></script>
<script>
  function toggleError(msg) {
    const error = document.getElementById('error');
    if(msg) {
      error.innerHTML = msg;
      error.classList.add('d-block');
      error.classList.remove('d-none');
    } else {
      error.innerHTML = '';
      error.classList.add('d-none');
      error.classList.remove('d-block');
    }
  }
  document.getElementById('url-input').addEventListener('keyup', (event) => {
    const url = event.srcElement.value;
    try {
      if(url.length > 8) {
        const pp = createPaymentPointer(url);
        document.getElementById('pp-input').value = pp;
      }
      toggleError();
    } catch (e) {
      toggleError(e.message);
    }
  });
  document.getElementById('pp-input').addEventListener('keyup', (event) => {
    const pp = event.srcElement.value;
    try {
      if(pp.length > 3) {
        const url = resolveUrl(pp);
        document.getElementById('url-input').value = url;
      }
      toggleError();
    } catch (e) {
      toggleError(e.message);
    }
  });
</script>

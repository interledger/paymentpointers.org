---
layout: home
title: Explainer
permalink: /
nav_order: 1
---
## Explainer

**Payment Pointers** are a standardized identifier for payment accounts. In the same way that an email address provides an identifier for a mailbox in the email ecosystem a payment pointer is used by an account holder to share the details of their account with a counter-party.

A Payment Pointer resolves to a URL (with the https scheme) that provides the location of a **payment initiation service** at which the counter-party can initiate a payment to or from the owner of the Payment Pointer.

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

### Syntax

Payment Pointers start with a `$` character to distinguish them from other identifiers and make it obvious that they are related to payments. To convert a Payment Pointer to a URL the `$` is replaced with the standard prefix of a secure URL, `https://`.

To accommodate short and easy to transcribe Payment Pointers some additional transformations are applied if the pointer has no path. If path of the transformed URL is empty or equal to `/` it is given the path `/.well-known/pay`. This accommodates the use case of origins that wish to host payment initiation services using a domain that also hosts other services (such as a website).

Payment Pointers don't contain query strings or fragments, however payment initiation services MAY define standard parameters that can be used by a client when connecting to the payment initiation service endpoint.

[More details...](/syntax-resolution)

### Flow

When making or a receiving a payment, a user passes a Payment Pointer to the counter-party who resolves the corresponding URL and connects to the payment initiation service at that location. The counter-party discovers which payment methods are supported by the payment initiation service through Content-Type negotiation and then initiates the payment interacting with the user as required.

[More details...](/flow)

<script src="/assets/js/paymentpointer.js"></script>
<script>
  document.getElementById('url-input').addEventListener('keyup', (event) => {
    const url = event.srcElement.value
    try {
      if(url.length > 8) {
        const pp = createPaymentPointer(url)
        document.getElementById('pp-input').value = pp
      }
      toggleError()
    } catch (e) {
      toggleError(e.message)
    }
  })  
  document.getElementById('pp-input').addEventListener('keyup', (event) => {
    const pp = event.srcElement.value
    try {
      if(pp.length > 3) {
        const url = resolveUrl(pp)
        document.getElementById('url-input').value = url
      }
      toggleError()
    } catch (e) {
      toggleError(e.message)
    }
  })
  function toggleError(msg) {
    if(msg) {
      document.getElementById('error').innerHTML = msg
      document.getElementById('error').classList.add('d-block')
      document.getElementById('error').classList.remove('d-none')
    } else {
      document.getElementById('error').innerHTML = ''
      document.getElementById('error').classList.add('d-none')
      document.getElementById('error').classList.remove('d-block')
    }
  }
</script>

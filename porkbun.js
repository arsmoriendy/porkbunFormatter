function getTldValues() {
  const tldEls = [...document.querySelectorAll(".domainsPricingAllExtensionsItem")]

  function formatPriceStringToFloat(tldString) {
    return parseFloat(tldString.replaceAll(/(\$)|(,)/g, ""));
  }

  function getPrice(tldEl, field) {
    return tldEl.querySelector(`.${field}>.sortValue`).innerHTML
  }

  function getRegularPrice(tldEl, field) {
    return tldEl.querySelector(`.${field} s`)?.innerHTML
  }

  const tlds = tldEls.map(el => {
    const registrationPrice = formatPriceStringToFloat(getPrice(el, "registration"));
    const renewalPrice = formatPriceStringToFloat(getPrice(el, "renewal"));
    const transferPrice = formatPriceStringToFloat(getPrice(el, "transfer"));

    let regularRegistrationPrice = getRegularPrice(el, "registration");
    let regularRenewalPrice = getRegularPrice(el, "renewal");
    let regularTransferPrice = getRegularPrice(el, "transfer");

    regularRegistrationPrice = regularRegistrationPrice ? formatPriceStringToFloat(regularRegistrationPrice) : registrationPrice;
    regularRenewalPrice = regularRenewalPrice ? formatPriceStringToFloat(regularRenewalPrice) : renewalPrice;
    regularTransferPrice = regularTransferPrice ? formatPriceStringToFloat(regularTransferPrice) : transferPrice;

    return {
      "el": el,
      "extension": el.querySelector(".col-xs-3>a").innerHTML,

      // prices
      "registrationPrice": registrationPrice,
      "renewalPrice": renewalPrice,
      "transferPrice": transferPrice,

      // regular prices
      "regularRegistrationPrice": regularRegistrationPrice,
      "regularRenewalPrice": regularRenewalPrice,
      "regularTransferPrice": regularTransferPrice,
    }
  })

  tlds.sortBy = function(field) {
    this.sort((a, b) => a[field] > b[field] + 0);
    return this;
  };

  tlds.filteredValues = ["extension", "registrationPrice", "renewalPrice", "transferPrice", "regularRegistrationPrice", "regularRenewalPrice", "regularTransferPrice"];

  tlds.filter = function(filteredValues = this.filteredValues) {
    const filteredTlds = [];
    this.forEach(tld => {
      const filteredTld = {};
      filteredValues.forEach(value => {
        filteredTld[value] = tld[value];
      });
      filteredTlds.push(filteredTld);
    })
    return filteredTlds;
  }

  return tlds;
}

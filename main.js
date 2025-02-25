document.addEventListener("DOMContentLoaded", () => {
  // Define all variables at the top
  const form = document.getElementById("mortgageForm");
  const clearAll = document.getElementById("clearAll");
  const imgContainer = document.querySelector(".img_container");
  const emptyState = `
      <img src="illustration-empty.svg" alt="" />
      <h2>Results shown here</h2>
      <p>Complete the form and click “calculate repayments” to see what your monthly repayments would be.</p>
    `;
  const resultStateClass = "results-active";

  // Set initial empty state
  imgContainer.innerHTML = emptyState;

  // Form submission
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    // Get form data
    const formData = new FormData(form);
    const amount = Number(formData.get("amount"));
    const term = Number(formData.get("term"));
    const rate = Number(formData.get("rate")) / 100;
    const type = formData.get("mortgage_type");

    // Check if all fields are filled
    if (!amount || !term || !rate || !type) {
      alert("Please fill all fields!");
      return;
    }

    // Calculate payments
    let monthly, total;
    if (type === "repayment") {
      monthly = calculateRepayment(amount, term, rate);
      total = monthly * term * 12;
    } else {
      // interest-only
      monthly = (amount * rate) / 12;
      total = monthly * term * 12 + amount;
    }

    // Show results and switch to results state
    showResults(monthly, total);
    imgContainer.classList.add(resultStateClass);
  });

  // Clear all
  clearAll.addEventListener("click", () => {
    form.reset();
    imgContainer.innerHTML = emptyState;
    imgContainer.classList.remove(resultStateClass);
  });

  // Calculate repayment mortgage
  function calculateRepayment(amount, term, rate) {
    const monthlyRate = rate / 12;
    const months = term * 12;
    return (amount * monthlyRate) / (1 - (1 + monthlyRate) ** -months);
  }

  // Show results
  function showResults(monthly, total) {
    imgContainer.innerHTML = `
        <h4>Your results</h4>
        <p>Here’s what you’ll pay based on your inputs.</p>
        <div class="result_box">
          <p>Monthly repayments</p>
          <span>€${monthly.toFixed(2)}</span>
          <p>Total over the term</p>
          <span>€${total.toFixed(2)}</span>
        </div>
      `;
  }
});

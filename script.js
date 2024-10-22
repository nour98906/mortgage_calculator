const mortgage = document.getElementById('mortgage');
const term = document.getElementById('term');
const rate = document.getElementById('rate');
const calcBtn = document.querySelector('.calc-btn');
const result = document.querySelector('.result');
const clearBtn = document.querySelector('.clearBtn');
let mortgageType;

function calculateMonthlyPayment() {
  // Convert the annual interest rate into a monthly rate
  let monthlyInterestRate = rate.value / 100 / 12;
  // Calculate the total number of payments (loan term in months)
  let numberOfPayments = term.value * 12;
  // Get the principal amount from the mortgage input
  let principal = parseFloat(mortgage.value);

  // Get the selected mortgage type
  mortgageType = document.querySelector('input[name="mortgageType"]:checked');

  if (!mortgageType) {
    return 'Invalid mortgage type'; // If no type is selected
  }

  // Determine the mortgage type
  selectedType = mortgageType.value;

  if (selectedType === 'repayment') {
    // Mortgage Calculation for Repayment
    let monthlyPayment =
      (principal *
        monthlyInterestRate *
        Math.pow(1 + monthlyInterestRate, numberOfPayments)) /
      (Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1);
    return monthlyPayment.toFixed(2);
  } else if (selectedType === 'interest') {
    // Mortgage Calculation for Interest Only
    let monthlyPayment = principal * monthlyInterestRate;
    return monthlyPayment.toFixed(2);
  } else {
    return 'Invalid mortgage type';
  }
}

calcBtn.onclick = function () {
  result.innerHTML = `
<h2 class="text-xl md:text-3xl m-6 font-semibold md:ml-14">Your Results</h2>
            <p class="text-slate-400 m-5 text-lg leading-8 md:max-w-96 md:ml-14">Lorem ipsum dolor sit amet
                consectetur
                adipisicing elit. Id
                reprehenderit,
                dolores
                ipsa eum praesentium
                saepe debitis harum amet illum earum odio ex quod perferendis?</p>
            <div
                class="main-result border-t border-solid border-t-yellow-300 bg-slate-800 mx-auto w-10/12 h-fit rounded-lg md:rounded-bl-xl md:mt-16 mb-7 md:mb-20 pb-5 md:pb-16">
                <p class="text-slate-400 m-5 md:my-5 md:mt-8 text-base">Your monthly repayments</p>
                <span class=" text-yellow-300 font-bold text-5xl m-4 md:mb-5">$${calculateMonthlyPayment()}</span>
                <hr class="mt-5 border-solid bg-slate-400 rounded-lg md:w-11/12 md:mt-5 mx-auto">
                <p class="text-slate-400 m-5 text-base md:mt-9 md:mb-7">Total you'll repay over the term</p>
                <span class="font-semibold text-3xl m-4 md:mt-9">$${
                  calculateMonthlyPayment() * 12 * term.value
                }</span>
            </div>
    `;
};

clearBtn.onclick = function () {
  mortgage.value = '';
  term.value = '';
  rate.value = '';
  result.innerHTML = `
                <div class="no-result md:ml-36 flex flex-col justify-center items-center">
                <img class="w-7/12 md:w-4/12 mt-5 md:mt-0" src="imgs/illustration-empty.svg" alt="">
                <h2 class="text-2xl font-bold my-4">Result shown here</h2>
                <p class="text-slate-400 text-center w-8/12 mb-6">Complete the form and click "Calculate Repayments" to
                    see what your monthly repayments will be.</p>
                </div>
    `;
};

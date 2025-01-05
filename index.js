const testMachine = (input) => {
  const variable = ["q0", "q1", "q2", "q3"];
  const startState = "q0";
  const finalState = "q2";

  let currentState = startState;

  const productsRules = {
    q0: { a: "q1", b: "q3" },
    q1: { a: "q3", b: "q2" },
    q2: { a: "q3", b: "q3" },
    q3: { a: "q3", b: "q3" },
  };

  for (const char of input) {
    const targetState = productsRules[currentState][char];

    if (targetState) {
      currentState = targetState;
    } else {
      return false;
    }
  }
  return finalState.includes(currentState);
};

const testContentInMachin = (event) => {
  event.preventDefault();

  const inputValue = input.value;
  const result = testMachine(inputValue);

  const successClass = "validation__result_success";
  const errorClass = "validation__result_error";

  if (result) {
    showResultWrapper.classList.remove(errorClass);

    showResultWrapper.classList.remove(successClass);
    void showResultWrapper.offsetWidth;
    showResultWrapper.classList.add(successClass);

    showResultState.innerHTML = result;
  } else {
    showResultWrapper.classList.remove(successClass);

    showResultWrapper.classList.remove(errorClass);
    void showResultWrapper.offsetWidth;
    showResultWrapper.classList.add(errorClass);

    showResultState.innerHTML = result;
  }
};



button.addEventListener("click", (event) => testContentInMachin(event));


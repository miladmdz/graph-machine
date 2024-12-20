/**
 * A class representing a Deterministic Finite Automaton (DFA) machine.
 */

class Machine {
  #allVariable = {};
  #finalState = "";
  #currentState = "";
  #productRules = {};

  /**
   * Creates a new Machine instance.
   * @param {string[]} variable - The list of all states in the DFA.
   * @param {string} finalState - The accepting (final) state of the DFA.
   * @param {string} startState - The starting state of the DFA.
   * @param {Object<string, Object<string, string>>} productionRules - The transition rules of the DFA.
   * Each state maps to an object where keys are input symbols and values are target states.
   */

  constructor(variable, finalState, startState, productionRules) {
    for (const state of variable) {
      this.#allVariable[state] = `${state}`;
    }
    this.startState = startState;
    this.#currentState = this.startState;
    this.#finalState = finalState;
    this.#productRules = productionRules;
  }

  /**
   * Checks whether the given input string is accepted by the DFA.
   * @param {string} input - The input string to check.
   * @returns {void} Logs `true` if the input string is accepted, `false` otherwise.
   */

  checkLanguage(input) {
    for (const char of input) {
      const targetState = this.#productRules[this.#currentState][char];

      if (targetState) {
        this.#currentState = targetState;
      } else {
        return console.log("result of test language ====>", false);
      }
    }
    return console.log(
      "result of test language ====>",
      this.#finalState.includes(this.#currentState)
    );
  }

  /**
   * Displays the DFA graph in the terminal.
   * @returns {void} Logs the DFA graph representation.
   **/

  showGraph() {
    console.log("----------------------------");
    console.log("DFA Graph Representation:");
    console.log("----------------------------");
    for (const [state, transitions] of Object.entries(this.#productRules)) {
      console.log(`State: ${state}`);
      for (const [input, targetState] of Object.entries(transitions)) {
        console.log(`  On '${input}' -> ${targetState}`);
      }
    }
    console.log("----------------------------");
    console.log(`Start State: ${this.startState}`);
    console.log(`Final State(s): ${this.#finalState}`);
    console.log("----------------------------");
  }
}

const variable = ["q0", "q1", "q2", "q3"];
const productsRules = {
  q0: { a: "q1", b: "q3" },
  q1: { a: "q3", b: "q2" },
  q2: { a: "q3", b: "q3" },
  q3: { a: "q3", b: "q3" },
};

const test = new Machine(variable, "q2", "q0", productsRules);

test.checkLanguage("abb");
test.showGraph();

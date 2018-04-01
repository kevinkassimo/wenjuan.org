export class TypeOfQuestions {
  static get STRING() { return 'string'; }
  static get NUMBER() { return 'number'; }
  static get OPTION() { return 'option'; }
}

export const allTypesOfQuestions = [
  TypeOfQuestions.STRING,
  TypeOfQuestions.NUMBER,
  TypeOfQuestions.OPTION
];
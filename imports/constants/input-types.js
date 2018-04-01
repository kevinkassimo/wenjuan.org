export class TypeOfStringInputs {
  static get EMAIL() { return 'email'; }
  static get TEXT() { return 'text'; }
  static get DATE() { return 'date'; }
  static get TIME() { return 'time'; }
  static get PARAGRAPH() { return 'paragraph'; }
  static get PASSWORD() { return 'password'; }
  static get FILE() { return 'file'; }
  static get URL() { return 'url'; }
}

export const allTypesOfStringInputs = [
  TypeOfStringInputs.EMAIL,
  TypeOfStringInputs.TEXT,
  TypeOfStringInputs.DATE,
  TypeOfStringInputs.TIME,
  TypeOfStringInputs.PARAGRAPH,
  TypeOfStringInputs.PASSWORD,
  TypeOfStringInputs.FILE,
  TypeOfStringInputs.URL
];

export class TypeOfNumberInputs {
  static get RATE() { return 'rate'; }
}

export const allTypesOfNumberInputs = [
  TypeOfNumberInputs.RATE
];

export class TypeOfOptionInputs {
  static get DROPDOWN() { return 'dropdown'; }
  static get MULTISELECT() { return 'multiselect'; }
  static get SELECT() { return 'select'; }
}

export const allTypesOfOptionInput = [
  TypeOfOptionInputs.DROPDOWN,
  TypeOfOptionInputs.MULTISELECT,
  TypeOfOptionInputs.SELECT
];

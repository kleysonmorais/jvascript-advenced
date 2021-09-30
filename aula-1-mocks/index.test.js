const { error } = require("./src/constants");
const File = require("./src/file");
const { rejects, deepStrictEqual } = require("assert");

(async () => {
  {
    const filePath = "./mocks/emptyFile-invalid.csv";
    const rejection = new Error(error.FILE_LENGTH_ERROR_MESSEGE);
    const result = File.csvToJson(filePath);
    await rejects(result, rejection);
  }

  {
    const filePath = "./mocks/fourItems-invalid.csv";
    const rejection = new Error(error.FILE_LENGTH_ERROR_MESSEGE);
    const result = File.csvToJson(filePath);
    await rejects(result, rejection);
  }

  {
    const filePath = "./mocks/threeItems-valid.csv";
    const result = await File.csvToJson(filePath);
    const expected = [
      {
        name: "Erick Wendel",
        id: 123,
        profession: "JavaScript Insctructior",
        birthDay: 1996,
      },
      {
        name: "Xuxa da Silva",
        id: 321,
        profession: "Team Leader",
        birthDay: 1956,
      },
      {
        name: "Joao",
        id: 342,
        profession: "Developer",
        birthDay: 1989,
      },
    ];
    deepStrictEqual(JSON.stringify(result), JSON.stringify(expected));
  }
})();

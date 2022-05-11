import { Command } from "commander";

function actionHandler(required, optional, options) {
  console.log("1st parameter", required);
  console.log("2nd parameter", optional);
  console.log("options", options);
}

export default function (program: Command) {
  program
    // defina o nome do subcomando
    .command("sample")
    // essa descricao vai aparecer no --help
    .description("this is a sample CLI subcommand")

    /*
      Argumentos que o comando recebe
      Cada argumento declarado vai ser enviado para a funcao passada para .action na
      ordem em que foi declarada
    */
    .argument("<required>", "com <> é um argumento obrigatório")
    .argument("[optional]", "com [] é um argumento opcional")

    /*
      Options/Flags
      Declare no formato simples (-f) para resposta booleana. Se for passado, o valor da flag vai vir true/false
      Declare nos dois formatos para tipos diferentes (como o exemplo abaixo)
      Para opções obrigatórias, use a função `requiredOption`
    */
    .option("-n, --number <int>", "Vai mandar pro actionHandler um inteiro com o nome 'number'")
    .option("-f", "Vai mandar pro actionHandler um boolean com o nome 'f'")

    /*
      Funcao que vai implementar os comandos passados
      A função vai receber um parametro para cada argumento, na ordem em que eles foram declarados.
      No exemplo acima, o primeiro parametro da funcao será o argumento 'required', e o segundo parametro
      será o argumento 'optional' (que caso nao seja informado, virá como undefined).
      Depois da lista de argumentos declarados, a função recebe um objeto com todos os options informados
      pelo chamador. Se o subcomando declarar 5 argumentos, os 5 primeiros parametros serão os argumentos
      declarados, na ordem em que foram declarados.
    */
    .action(actionHandler);
}

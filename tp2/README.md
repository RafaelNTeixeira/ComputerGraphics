# CG 2023/2024

## Group T09G012

## TP 2 Notes

### Exercício 2

- No ponto 1 colocou-se o objeto `MyDiamond` no plano XY através de operações com matrizes com a função **multMatrix()**. Para criação do tangram, rodamos o diamante de forma a assumir a forma de um quadrado com a aplicação de uma matriz de rotação e centrámo-lo na origem do eixo dos y para que ficasse simétrico.

- No ponto 2 foram adicionadas as restantes peças do tangram nas posições respetivas relativamente à imagem que nos foi atribuída, utilizando operações de translação, rotação e escalamento. 

- No ponto 3 foi criada uma classe `MyTangram` para que esta seja a responsável em dar display de todas as peças que constituem o tangram. No ficheiro `MyScene` é chamada a função da classe `MyTangram` que dá display do tangram.

![Screenshot 1](screenshots/cg-t09-g12-tp2-1.png)


### Exercício 3

- No ponto 1 criou-se um ficheiro **MyUnitCube.js** e nele foram definidos 8 vértices e suas ligações para criação de um cubo dentro da função **initbuffers()**. 

- No ponto 2 importou-se o ficheiro **MyUnitCube.js** no **MyScene.js**

- No ponto 3, dentro do **MyScene**, criou-se um objeto do tipo **MyUnitCube** na função **init()** e invocou-se a função **display()** desse objeto na função **display()** do **MyScene**. Desta forma, foi apresentado na tela um cubo centrado na origem.
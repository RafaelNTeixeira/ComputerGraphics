# CG 2023/2024

## Group T09G012

## Project Notes

### 1. Sky-Sphere

- No ponto 1.1, criamos uma classe `MySphere` para criação de uma esfera que representará um globo. Para sua criação, tivemos que ter por base divisões angulares. Inicialmente, tentamos seguir o exemplo do objeto `MyCylinder` criado na TP3 porém, como não nos podiamos basear na determinação de stacks pela altura e como obviamente a implementação de um cilindro difere da implementação de uma esfera, o processo obrigou-nos a raciocinar mais e demonstrou ser mais complicado. Eventualmente conseguimos chegar a uma solução e decidimos comentar o código implementado para uma fácil perceção do raciocínio aplicado.

- No ponto 1.2, criamos uma classe `MyPanorama` para aplicação de um panorama na parte interior do objeto `MySphere`. Durante a criação desta classe, ao realizarmos a aplicação da textura do panorama, reparamos que a nossa esfera não estava a ser corretamente construída devido a dois problemas. O primeiro **impedia o display da textura panorama no interior da esfera**, mesmo estando as normais corretamente invertidas. Já o segundo problema, identificado após correção do primeiro problema, **provocava uma desconfiguração do polo sul**. Dando este problemas como corrigidos, para finalizar este exercício, alteramos o **FoV** que modo a dar uma perspetiva satisfatória ao visualizador e criamos uma opção que centra a posição da câmara de modo a dar uma ilusão de que a superfície esférica se encontre sempre posicionada no infinito (`infiniteView` na GUI).

![Screenshot 1](screenshots/project-t09g12-1a.png)

Com `infiniteView`:

![Screenshot 2](screenshots/project-t09g12-1b.png)



### 2. Flores

- No ponto 2.1, criamos uma classe `MyFlower` para representação de uma flor com um receptáculo, pétalas, caule e folhas. Para a sua constituição, separamos cada uma das suas componentes em diferentes classes:
    -  `MyPetal` para as representação das pétalas
    -  `MyReceptacle` para as representação do receptáculo
    -  `MyStem` para as representação do caule 

- No ponto 2.2, procuramos abrir possibilidade à personalização de cada uma das componentes da flor através da interface. Para isso, adicionamos event handlers de forma ao alterar um valor da interface, o valor atribuido ao construtor é automaticamente alterado e consequentemente a flor alterada. Nesta fase, tivemos algumas dificuldades em aplicar o ângulo para curvatura das pétalas e a alteração das características da flor mas com a ajuda da consola do browser conseguimos descobrir o que causava o problema.

- No ponto 2.3, para criação do `MyGarden`, criamos uma matriz e atribuímos a cada um do seu espaço um objeto `MyFlower` com valores aleatórios de cor, raio e tamanhos aleatórios.

- No ponto 2.4, aplicamos texturas às componentes de forma a aplicar rugosidade. Durante este processo tivemos dificuldade em aplicá-las devido a um conflito de uma componente **CFGAppearence** com os restantes materiais **CFGAppearence** de cada componente da flor. Ao descobrirmos o que causava o conflito, o resto do processo foi desenvolvido sem dificuldades

![Screenshot 3](screenshots/project-t09g12-2a.png)

![Screenshot 4](screenshots/project-t09g12-2b.png)


### 3. Pedras e penedos

- No ponto 3 criamos primeiro a classe `MyRock` , semelhante ao `MySphere`, mas onde alteramos a inclinação das normais de forma a criar ligeiras diformações e tornar as pedras mais realistas. De seguida criamos a classe `MyRockSet` onde geramos 10 pedras da classe `MyRock` e metemos em posições diferentes e com texturas diferentes.

![Screenshot 5](screenshots/project-t09g12-3.png)


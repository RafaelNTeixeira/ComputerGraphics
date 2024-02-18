# CG 2023/2024

## Group T09G012

## TP 1 Notes

### Exercício 1:

- No ponto 1, foi desenvolvido o ficheiro MyTriangle.js com apenas 1 triângulo de base, seguindo como exemplo o ficheiro MyDiamond.js. 
- No ponto 2 foram criadas checkboxes no ficheiro MyInterface.js e variáveis bool e objetos dos objetos geométricos que queremos desenhar (dentro da função `init()` do **MyScene.js**) para os associar à checkboxes respetivas e determinar quando se irá dar display ou não display dos objetos (dentro da função `display()` do ficheiro **MyScene.js**): 

**MyInterface.js:**
```js
init() {
    ...

    // Create checkboxes
    this.gui.add(this.scene, 'diamondVisible').name('Diamond Visible');
    this.gui.add(this.scene, 'triangleVisible').name('Triangle Visible');

    ...
}
```

**MyScene:**
```js
init(application) {
    ...

    //Initialize scene objects
    this.diamond = new MyDiamond(this);
    this.triangle = new MyTriangle(this);

     //Objects connected to MyInterface
    this.diamondVisible = true;
    this.triangleVisible = true;

    ...
}

display() {
    ...

    // Draw Elements
    if (this.diamondVisible) {
      this.diamond.display();
    }

    if (this.triangleVisible) {
      this.setDiffuse(1.0, 0.5, 0.5, 1.0);
      this.triangle.display();
    }
}
```

- No ponto 3 criamos um paralelogramo double sided através da repetição dos índices e da sua ordem:

```js
initBuffers() {
		this.vertices = [
			0, 0, 0,	//0
			2, 0, 0,	//1
			3, 1, 0,	//2
			1, 1, 0,	//3
		];

		//Counter-clockwise reference of vertices
		this.indices = [
			0, 1, 2,
			2, 3, 0
			,
			2, 1, 0,
			0, 3, 2
		];

        ...
}
```

- No ponto 4 repetimos o que se fez no ponto 2 mas para o objeto do paralelogramo



### Exercício 2

- Através dos passos anteriores e do código do ficheiro **MyTriangle.js**, criamos as figuras `MyTriangleSmall` e `MyTriangleBig` e as suas respetivas checkoxes de visibilidade.

![Screenshot 1](screenshots/cg-t09-g12-tp1-1a.png)
![Screenshot 2](screenshots/cg-t09-g12-tp1-1b.png)

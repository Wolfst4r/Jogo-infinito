var pista;
var pistaImg;
var olaf;
var olafImg;
var florImg;
var flor;
var flocosImg;
var flocos;
var cenoura;
var cenouraImg;
var sol;
var solImg;
var treasureCollection = 0;
var solGroup;
var endImg;
var florGroup;
var flocosGroup;
var cenouraGroup;
var end;



var PLAY = 1;
var END = 0;
var gameState = 1;
var velocity = 5;


function preload() {
    pistaImg = loadImage("Road.png");
    olafImg = loadImage("olaf.png");
    florImg = loadImage("flor.png");
    flocosImg = loadImage("flocos.png");
    cenouraImg = loadImage("cenoura.png");
    solImg = loadImage("sol.png");
    endImg = loadAnimation("fimdeJogo.png");

}

function setup() {

    createCanvas(windowWidth, windowHeight);

    pista = createSprite(width / 2, 200);
    pista.addImage(pistaImg);
    pista.velocityY = 7;

    olaf = createSprite(width / 2, height - 102, 20, 20);
    olaf.addImage(olafImg);
    olaf.scale = 0.2;

   end = createSprite(300,300,300,300);
   end.scale = 0.5;
   end.addAnimation("A",endImg);
   end.x = width / 2;
   end.y = height / 2;
   end.visible = false;


    florGroup = new Group();
    flocosGroup = new Group();
    solGroup = new Group();
    cenouraGroup = new Group();


}

function draw() {
    if (gameState === PLAY) {
        background(0);
        olaf.x = World.mouseX;

        edges = createEdgeSprites();
        olaf.collide(edges);

        if (World.frameCount % 100 == 0) {
            velocity += 1;
        }

        if (pista.y > height) {
            pista.y = height / 22;
        }

        createFlor();
        createFlocos();
        createCenoura();
        createSol();

        if (florGroup.isTouching(olaf)) {
            florGroup.destroyEach();
            treasureCollection = treasureCollection + 150;
        }
        else if (flocosGroup.isTouching(olaf)) {
            flocosGroup.destroyEach();
            treasureCollection = treasureCollection + 100;
        }
        else if (cenouraGroup.isTouching(olaf)) {
            cenouraGroup.destroyEach();
            treasureCollection = treasureCollection + 50;
        }
        if (solGroup.isTouching(olaf)) {
            gameState = END;

            if (gameState === END) {
                end.visible = true;
                console.log("fim")
            }


            florGroup.destroyEach();
            cenouraGroup.destroyEach();
            flocosGroup.destroyEach();
            solGroup.destroyEach();
            olaf.destroy();

            florGroup.setVelocityYEach(0);
            cenouraGroup.setVelocityYEach(0);
            flocosGroup.setVelocityYEach(0);
            solGroup.setVelocityYEach(0);

        }

        background(50);
        drawSprites();
        textSize(20);
        fill(255);

        text("Tesouro: " + treasureCollection, width - 150, 30);



    }


}

function createFlor() {
    if (World.frameCount % 150 == 0) {
        var flor = createSprite(Math.round(random(50, width - 50), 40, 10, 10));
        flor.addImage(florImg);
        flor.scale = 0.12;
        flor.velocityY = velocity;
        flor.lifetime = 200;
        florGroup.add(flor);
    }
}

function createFlocos() {
    if (World.frameCount % 100 == 0) {
        var flocos = createSprite(Math.round(random(50, width - 50), 40, 10, 10));
        flocos.addImage(flocosImg);
        flocos.scale = 0.12;
        flocos.velocityY = velocity;
        flocos.lifetime = 200;
        flocosGroup.add(flocos);

    }

}

function createCenoura() {
    if (World.frameCount % 120 == 0) {
        var cenoura = createSprite(Math.round(random(50, width - 50), 40, 10, 10));
        cenoura.addImage(cenouraImg);
        cenoura.scale = 0.12;
        cenoura.velocityY = velocity;
        cenoura.lifetime = 200;
        cenouraGroup.add(cenoura);

    }
}

function createSol() {
    if (World.frameCount % 80 == 0) {
        var sol = createSprite(Math.round(random(50, width - 50), 40, 10, 10));
        sol.addImage(solImg);
        sol.scale = 0.1;
        sol.velocityY = velocity;
        sol.lifetime = 200;
        solGroup.add(sol);

    }
}
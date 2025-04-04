// 이미지 및 반지름 추가
import { FRUITS } from "./fruits.js";

// 모듈 불러오기

var Engine = Matter.Engine ,
    Render = Matter.Render ,
    Runner = Matter.Runner ,
    Bodies = Matter.Bodies ,
    World = Matter.World;


// 엔진 선언
const engine = Engine.create();

// 렌더 선언
const render = Render.create({
    engine,
    // 어디에 그릴 것인지
    element : document.body,
    options: {
        wireframes: false,
        background: '#F7FAC8',
        width : 620,
        height : 850.
    }
});

//벽 배치를 위한 world 선언
const world = engine.world;

// 벽 생성
const leftWall = Bodies.rectangle( 15, 395, 30, 790,{
                                 // x좌표, y좌표, width , height
    isStatic: true, 
    render: { fillStyle: '#E6B143'}                                 
})

const rightWall = Bodies.rectangle( 605, 395, 30, 790,{
    isStatic: true, 
    render: { fillStyle: '#E6B143'}                                 
})

const ground = Bodies.rectangle( 310, 820, 620, 60,{
    isStatic: true, 
    render: { fillStyle: '#E6B143'}                                 
})

const topLine = Bodies.rectangle( 310, 150, 620, 2,{
    isStatic: true, 
    // 센서 감지 기능
    isSensor: true,
    render: { fillStyle: '#E6B143'}                                 
})

// 생성한 벽을 월드에 배치

World.add(world, [leftWall, rightWall, ground, topLine]);

//실행
Render.run(render);
Runner.run(engine);

//현재 과알 값을 저장하는 변수
let currentBody = null;
let currentFruit = null;

// 과일을 추가하는 함수
function addFruit() {

const index = Math.floor(Math.random() * 5);

const fruit = FRUITS[index];    

const body = Bodies.circle(300, 50, fruit.radius,
    {
        index : index,
        //처음 시작할때 프리징
        isSleeping : true,
        render: {
            sprite: {texture: `${fruit.name}.png`}
        },
        restitution : 0.4,
    });


    currentBody = body;
    currentFruit = fruit;


    World.add(world, body);

}


// 함수호출
addFruit();
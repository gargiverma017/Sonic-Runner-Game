import k from "../kaplayCtx"
import makeSonic from "../entities/sonic";

export default function mainMenu(){
    if(!k.getData("best-score")){
        k.setData("best-score",0);
    }
    
    //when the button is pressed
    k.onButtonPress("jump",()=>{
        k.go("game")
    })

    const bgPieceWidth=1920;
    //create components with k.add and k.sprite
    const bgPieces= [k.add([k.sprite("chemical-bg"),
        k.pos(0,0),
        k.scale(2),
        k.opacity(0.8),
        ]),

        k.add([k.sprite("chemical-bg"),
            k.pos(bgPieceWidth*2,0),
            k.scale(2),
            k.opacity(0.8),
            ])
    ]
    
    const platformWidth=1280;
    const platforms=[
        k.add([k.sprite("platforms"), k.pos(0,450),k.scale(4)]),

        k.add([k.sprite("platforms"), k.pos(platformWidth*4,450),k.scale(4)]),
    ]
    
    k.add([k.text("SONIC RING RUN",{font:"mania",size:96}),
        k.pos(k.center().x,200),
        k.anchor("center")
    ])
    k.add([k.text("Press Space/Click/Touch to Play",{font:"mania",size:32}),
        k.pos(k.center().x, k.center().y - 200),
        k.anchor("center")
    ])

    //call sonic character
    makeSonic(k.vec2(200,745))


    //function that going to run every fps...to move first piece at start of second
    k.onUpdate(()=>{
        if(bgPieces[1].pos.x < 0){
            bgPieces[0].moveTo(bgPieces[1].pos.x + bgPieceWidth*2 , 0);
            bgPieces.push(bgPieces.shift())
        }

        bgPieces[0].move(-100,0);
        bgPieces[1].moveTo(bgPieces[0].pos.x + bgPieceWidth*2,0);




        if(platforms[1].pos.x < 0){
            platforms[0].moveTo(platforms[1].pos.x + platformWidth*4 ,450);
            platforms.push(platforms.shift())
        }
        platforms[0].move(-4000,0);
        platforms[1].moveTo(platforms[0].pos.x + platformWidth*4 ,450)
    })

} 
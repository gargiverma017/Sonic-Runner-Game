import k from "../kaplayCtx"
import makeSonic from "../entities/sonic";
import { makeMotobug } from "../entities/motobug";
import { makeRing } from "../entities/ring";



export default function game(){
    k.setGravity(3100);
    const citySfx= k.play("city",{volume:0.3,loop:true})

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

        k.add([k.sprite("platforms"), k.pos(platformWidth,450),k.scale(4)]),
    ]

    ///////////////////////////////////////////////////////////////////////////
    let score=0;
    let scoreMultiplier=0;

    const scoreText= k.add([
        k.text("SCORE : 0",{font: "mania",size:72}),
        k.pos(20,20),    
    ])
    /////////////////////////////////////////////////////////////////////////
    const sonic=makeSonic(k.vec2(200,745));
    sonic.setControls();
    sonic.setEvents();
    //when sonic and motobug colloid
    sonic.onCollide("enemy",(enemy)=>{
        if(!sonic.isGrounded()){ //is not grounded or in the air above motobug make it jump
            k.play("destroy",{volume:0.5}); //play the sound destroy
            k.play("hyper-ring",{volume:0.5});
            k.destroy(enemy); //destroy the enemy that came through function
            sonic.play("jump"); //play the sonic's jump animation
            sonic.jump(); ////make sonic jump
            //TODO the calculations
            scoreMultiplier+=1;
            score += 10*scoreMultiplier;
            scoreText.text=`SCORE : ${score}`;
            if(scoreMultiplier===1){
                sonic.ringCollectUI.text="+10"
            }
            if(scoreMultiplier>1){
                sonic.ringCollectUI.text=`x${scoreMultiplier}`
            }

            k.wait(1,()=>{
                sonic.ringCollectUI.text="";
            })
            return;
        }

        k.play("hurt",{voulyme:0.5});
        //TODO 
        k.setData("current-score",score) //save the current score
        k.go("gameover",citySfx) //go to gameover scene (to go to next scene)
    })

    //when sonic and ring colloid
    sonic.onCollide("ring",(ring)=>{
        k.play("ring",{volume:0.5});
        k.destroy(ring); //// every time sonic collides with anything with tag "ring", remove it
        score++;
        //TODO
        scoreText.text=`SCORE : ${score}`;
        sonic.ringCollectUI.text="+1";
        k.wait(1,()=>{
            sonic.ringCollectUI.text="" //text back to normal 
        })
    })

    

    let gameSpeed=300;
    k.loop(1,()=>{
        gameSpeed+=50
    })
    
    ///////////////////////////////
    //implementing enemy logic
    ////////////////////////////
    const spawnMotoBug= ()=>{
        const motobug=makeMotobug(k.vec2(1950,773));
        motobug.onUpdate(()=>{
            if(gameSpeed<3000){
                motobug.move(-(gameSpeed+300),0);
                return;
            }

            motobug.move(-gamespeed,0) //stationary
        });

        motobug.onExitScreen(()=>{ //Register an event that runs when object goes out of view.
            if(motobug.pos.x < 0){
                k.destroy(motobug)
            }
        })

        //make waittime range
        const waitTime=k.rand(0.5,2.5);
        k.wait(waitTime,spawnMotoBug) //Run the callback after n seconds.
    }
    spawnMotoBug();

    //implementing ring logic
    const spawnRing= ()=>{
        const ring= makeRing(k.vec2(1950,745));
        //ring on every frame
        ring.onUpdate(()=>{
            ring.move(-gameSpeed,0); //stationary
        })

        //when out of the scene
        ring.onExitScreen(()=>{
            if(ring.pos.x < 0){
                k.destroy(ring)
            }
        })

        const waitTime = k.rand(0.5,3);
        k.wait(waitTime, spawnRing);
    }
    spawnRing();

    
    
    //rect over the track which act as plateform
    k.add([
        k.rect(1920,300),
        k.opacity(0),
        k.area(),
        k.pos(0,832),
        k.body({ isStatic:true}),
    ])


    k.onUpdate(()=>{
        if(sonic.isGrounded()){
            scoreMultiplier=0;
        }

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
        platforms[0].move(-gameSpeed,0);
        platforms[1].moveTo(platforms[0].pos.x + platformWidth*4 ,450)
    })
}
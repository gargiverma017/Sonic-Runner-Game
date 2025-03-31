import k from "../kaplayCtx"

export default function makeSonic(pos){
    const sonic = k.add([
        k.sprite("sonic",{anim: "run"}),
        k.scale(4),
        k.area(),
        k.anchor("center"),
        k.pos(pos),
        k.body({jumpForce:1700}), //to use the method isGrounded()
        //we can also pass the properties 
        {   
            ringCollectUI:null,

            setControls(){
                k.onButtonPress("jump",()=>{
                    if(this.isGrounded()){
                        this.play("jump"); //this will take the sonic into jump animation we created named jump
                        this.jump(); //this will make the actial sonic jump
                        k.play("jump") //this will play the sound named jump
                    }
                });
            },
            setEvents(){
                this.onGround(()=>{
                    this.play("run") //back to the run named animation if on ground
                })
            }
        }
    ])
    
    //child game object
    sonic.ringCollectUI= sonic.add([
        k.text("",{font:"mania", size:24}),
        k.color(255,255,0), //yellow
        k.anchor("center"),
        k.pos(30,-10),
    ])
    return sonic;
}
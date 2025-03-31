import k from "../kaplayCtx"

export function makeMotobug(pos){
    return k.add([
        k.sprite("motobug", {anim:"run"}),
        k.area({shape: new k.Rect(k.vec2(-5,0),32,32)}),
        k.scale(4),
        k.anchor("center"),
        k.pos(pos),
        k.offscreen(), //Control the behavior of object when it goes out of view
        //and to use onExitScreen() which Register an event that runs when object goes out of view.
        "enemy",
    ])
}
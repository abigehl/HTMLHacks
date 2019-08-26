var effect;
var trigger = "noTrigger";
var timeF = "noTimeF";
var dur;
var time = 5;

function changeTransition(transform) {
    setTimeout(resetDuration, 100);
    restoreAnimationDefaults();
    setTimeout(setNew.bind(0, "transform", transform), 200);
}
function changeAnimation(x, y, z) {
    setTimeout(resetDuration, 100);
    restoreAnimationDefaults();
    if (z != null) {
        document.getElementById("animationElement").style.setProperty(x, y);
        setTimeout(setNew.bind(0,x,z), 200);
    }
    else {
        setTimeout(setNew.bind(0, x, y), 200);
    }
}

function setNew(x, y) {
    document.getElementById("animationElement").style.setProperty(x, y);
}

function restoreAnimationDefaults() {
    document.getElementById("animationElement").style.transform = "initial";
    document.getElementById("animationElement").style.transitionDuration = "0s";
    document.getElementById("animationElement").style.animationDuration = "0s";
    document.getElementById("animationElement").style.transitionDelay = "0s";
    document.getElementById("animationElement").style.animationDelay = "0s";
    document.getElementById("animationElement").style.setProperty('opacity', 1);
    document.getElementById("animationElement").style.setProperty('background-color', "rgb(125, 67, 53)");
};

function resetDuration(){

    document.getElementById("animationElement").style.transitionDuration = time + "s";
    document.getElementById("animationElement").style.animationDuration = time + "s";
    document.getElementById("animationElement").style.animationDelay = delay + "s";
    document.getElementById("animationElement").style.transitionDelay = delay + "s";
};

function toggleAnimationButton(id) {
    
    setTimeout(resetDuration, 100);
    restoreAnimationDefaults();
    if (trigger == 0) {
        trigger = "noTrigger";
    }
    if (effect == id || trigger == id || timeF == id) {
        return;
    }
    switch (id) {
        case "opacityIn":
        case "opacityOut":
        case "background-color":
        case "rotate(180deg)":
        case "translate(10vw)":
        case "scale(.5)":
            if (effect != undefined && effect!=0) {
                document.getElementById(effect).classList.toggle('animationToggleBtn');
            }
            effect = id;
            break;
        case "noTrigger":
        case "hoverTrigger":
        case "clickTrigger":
        case "enterTrigger":
        case "scrollTrigger":
            document.getElementById("animationElement").style.animationPlayState = "paused";
            if (trigger != undefined && trigger!=0) {
                document.getElementById(trigger).classList.toggle('animationToggleBtn');
                switch (trigger) {
                    case "noTrigger":
                        break;
                    case "hoverTrigger":
                        document.getElementById("animationElement").removeEventListener('mouseover', playAnimation);
                        break;
                    case "clickTrigger":
                        document.getElementById("animationElement").removeEventListener('click', playAnimation);
                        break;
                    case "enterTrigger":
                        document.removeEventListener('keyup', playAnimation);
                        break;
                    case "scrollTrigger":
                        document.removeEventListener('wheel', playAnimation);
                        break;
                }
            }
            trigger = id;
            switch (trigger) {
                case "noTrigger":
                    playAnimation();
                    document.getElementById("animationElement").style.animationPlayState = "initial";
                    break;
                case "hoverTrigger":
                    document.getElementById("animationElement").addEventListener('mouseover', playAnimation);
                    document.getElementById("animationElement").style.animationPlayState = "paused";
                    break;
                case "clickTrigger":
                    document.getElementById("animationElement").addEventListener('click', playAnimation);
                    document.getElementById("animationElement").style.animationPlayState = "paused";
                    break;
                case "enterTrigger":
                    document.addEventListener('keyup', playAnimation);
                    document.getElementById("animationElement").style.animationPlayState = "paused";
                    break;
                case "scrollTrigger":
                    document.addEventListener('wheel', playAnimation);
                    document.getElementById("animationElement").style.animationPlayState = "paused";
                    break;
            }
            break;
        case "noTimeF":
            document.getElementById("animationElement").style.animationTimingFunction = "none";
            if (timeF != undefined) {
                document.getElementById(timeF).classList.toggle('animationToggleBtn');
            }
            if (trigger == "noTrigger") {
                playAnimation();
            }
            timeF = id;
            break;
        case "linearTimeF":
            document.getElementById("animationElement").style.animationTimingFunction = "linear";
            if (timeF != undefined) {
                document.getElementById(timeF).classList.toggle('animationToggleBtn');
            }
            if (trigger == "noTrigger") {
                playAnimation();
            }
            timeF = id;
            break;
        case "easeTimeF":
            document.getElementById("animationElement").style.animationTimingFunction = "ease";
            if (timeF != undefined) {
                document.getElementById(timeF).classList.toggle('animationToggleBtn');
            }
            if (trigger == "noTrigger") {
                playAnimation();
            }
            timeF = id;
            break;
        case "easeinTimeF":
            document.getElementById("animationElement").style.animationTimingFunction = "ease-in";
            if (timeF != undefined) {
                document.getElementById(timeF).classList.toggle('animationToggleBtn');
            }
            if (trigger == "noTrigger") {
                playAnimation();
            }
            timeF = id;
            break;
        case "easeoutTimeF":
            document.getElementById("animationElement").style.animationTimingFunction = "ease-out";
            if (timeF != undefined) {
                document.getElementById(timeF).classList.toggle('animationToggleBtn');
            }
            if (trigger == "noTrigger") {
                playAnimation();
            }
            timeF = id;
            break;
        case "easeinoutTimeF":
            document.getElementById("animationElement").style.animationTimingFunction = "ease-in-out";
            if (timeF != undefined) {
                document.getElementById(timeF).classList.toggle('animationToggleBtn');
            }
            if (trigger == "noTrigger") {
                playAnimation();
            }
            timeF = id;
            break;

    };
    document.getElementById(id).classList.toggle('animationToggleBtn');
    if (trigger == "noTrigger") {
        playAnimation();
    }
};

function playAnimation() {
    time = document.getElementById("animationDurationInput").value;

    if (time != null) {
        document.getElementById("animationElement").style.animationDuration = time + "s";
        document.getElementById("animationElement").style.transitionDuration = time + "s";
    }
    else {
        time = 2;
        document.getElementById("animationElement").style.transitionDuration = 2 + "s";
        document.getElementById("animationElement").style.animationDuration =2 + "s";
    }
    setTimeout(resetDuration, 100);
    restoreAnimationDefaults();

     delay = document.getElementById("animationDelayInput").value;
    if (delay != null) {
        document.getElementById("animationElement").style.animationDelay = delay + "s";
        document.getElementById("animationElement").style.transitionDelay = delay + "s";
    }
    else {
        document.getElementById("animationElement").style.animationDelay = 0 + "s";
    }
    
    document.getElementById("animationElement").style.animationPlayState = "initial";
    document.getElementById("animationElement").style.animationDuration = time + "s";
    document.getElementById("animationElement").style.animationDelay = delay + "s";
    switch (effect) {
        case "translate(10vw)":
        case "rotate(180deg)":
        case "scale(.5)":
            changeTransition(effect);
            break;
        case "opacityIn":
            changeAnimation('opacity', 0, 1);
            break;
        case "opacityOut":
            changeAnimation('opacity', 1, 0);
            break;
        case "background-color":
            changeAnimation('background-color', 'rgb(90, 17, 144)', null);
            break;
    }
};



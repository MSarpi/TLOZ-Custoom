kaboom({
    global: true,
    width: 529, // width of canvas
    height: 500, // height of canvas
    fullscreen: false,
    scale: 1.5,
    debug: true,
    clearColor: [0,0,0,1]
})

//Creamos una const para designar la velocidad del personaje 
    const MOVE_SPEED = 120

//carga los sprites directamente de la pagina imgur, tambien se pueden cargar directamente de la carpeta señalando la ubicación de la imnagen
//en este caso se usara via online
    loadRoot('https://i.imgur.com/')


//Set de movimientos de link
    loadSprite('link-izquierda', '1Xq9biB.png')
    loadSprite('link-derecha', 'yZIb8O2.png')
    loadSprite('link-abajo', 'r377FIM.png')
    loadSprite('link-arriba', 'UkV0we0.png')

//Set de escenario Paredes
    loadSprite('pared-izquierda', 'rfDoaa1.png')
    loadSprite('pared-superior', 'QA257Bj.png')
    loadSprite('pared-inferior', 'vWJWmvb.png')
    loadSprite('pared-derecha', 'SmHhgUn.png')

//set de escensario paredes - Esquinas
    loadSprite('esquina-inferior-izquierda', 'awnTfNC.png')
    loadSprite('esquina-inferior-derecha', '84oyTFy.png')
    loadSprite('esquina-superior-izquierda', 'xlpUxIm.png')
    loadSprite('esquina-superior-derecha', 'z0OmBd1.png')

//Set de escenario interiores
    loadSprite('puerta-superior', 'U9nre4n.png')
    loadSprite('puerta-izquierda', 'okdJNls.png')
    loadSprite('olla-fuego', 'I7xSp7w.png')
    loadSprite('torches', 'wiSiY09.png')
    loadSprite('escaleras', 'VghkL08.png')
    loadSprite('bg', 'u4DVsx6.png')

//Set enemigos
    loadSprite('enemigo-renabadora', 'c6JFi5Z.png')
    loadSprite('enemigo-renabadora-2', 'c6JFi5Z.png')
    loadSprite('enemigo-esqueleto', 'Ei1VnX8.png')
    loadSprite('enemigo-esqueleto-2', 'Ei1VnX8.png')

//Set Golpe a enemigo 
    loadSprite('hit-enemigo', 'o9WizfI.png')
    loadSprite('hit-enemigo-2', '7W5a8R2.png')


//Cargar escena
    scene("game", ({ level, score }) => {

        //cargamos la imagen de fondo "suelo"
        layers(['bg', 'obj', 'ui'], 'obj')

        //creamos el mapa para
        const maps = [
            [
                'gbblbbibbbh',
                'a         d',
                'a      5  d',
                'a    k    d',
                'j         d',
                'a    k    d',
                'a   5     d',
                'a         d',
                'ecclcclcccf', 
            ],
            [
                'gbbbbbbbbbh',
                'ak       kd',
                'a         d',
                'a         d',
                'j    6    m',
                'a         d',
                'a         d',
                'ak       kd',
                'ecccccccccf', 
            ]
        ]

            // configuraremos que letra o seña sera cada sprite que hemos ingresado
                const levelCfg = {
                width: 48,
                height: 48,

            //set movimientos link
                '1': [sprite('link-izquierda'), solid()],
                '2': [sprite('link-derecha'), solid()],
                '3': [sprite('link-arriba'), solid()],
                '4': [sprite('link-abajo'), solid()],
            
            //set enemigos
                '5': [sprite('enemigo-renabadora'), 'enemigo-renabadora', {dir: -1, timer: 0 }, 'dangerous'],
                '6': [sprite('enemigo-esqueleto'), 'enemigo-esqueleto', {dir: -1, timer: 0 }, 'dangerous'],

            //set golpe a enemigo 
                '%': [('hit-enemigo'), solid()],

            //set paredes 
                'a': [sprite('pared-izquierda'), solid(), 'wall'],
                'b': [sprite('pared-superior'), solid(), 'wall'],
                'c': [sprite('pared-inferior'), solid(), 'wall'],
                'd': [sprite('pared-derecha'), solid(), 'wall'],

            // set paredes - esquinas
                'e': [sprite('esquina-inferior-izquierda'), solid(), 'wall'],
                'f': [sprite('esquina-inferior-derecha'), solid(), 'wall'],
                'g': [sprite('esquina-superior-izquierda'), solid(), 'wall'],
                'h': [sprite('esquina-superior-derecha'), solid(), 'wall'],

            //Set de escenario interiores
                'i': [sprite('puerta-superior'), 'siguiente-nivel'],
                'j': [sprite('puerta-izquierda'), solid(), 'door'],
                'k': [sprite('olla-fuego'), solid()],
                'l': [sprite('torches'), solid()],
                'm': [sprite('escaleras'), 'siguiente-nivel'],
        }
        //añadimos addlevel que se encarga de dar imagen a la configuración que hemos hecho 
            addLevel(maps[level], levelCfg)

            add([sprite('bg'), layer('bg')])

        // se agrega numero de nivel  
            const scorelabel = add([
                text('0'),
                pos(400, 450),
                layer('ui'),
                {
                    value: score,
                },
                scale(2)
            ])

            add([text('level ' + parseInt(level+1)), pos(400,485), scale(2)])


        //agregamos la posicion del jugador 
            const player = add([
                sprite('link-derecha'),
                //posicion
                pos(5, 190),
                {
                    //direccion por defecto
                    dir: vec2(1,0),
                }
            ])

            player.action(() => {
                player.resolve()
            })

        //agregaremos la propiedad lvl para añadir otros niveles
            player.overlaps('siguiente-nivel', () => {
                go("game", {
                    level: (level+1) % maps.length,
                    score: scorelabel.value
                })
            })
        //agregaremos los movimientos del jugador
            
        //agregamos la dirección izquierda 
            keyDown('left', () => {
                player.changeSprite('link-izquierda')
                player.move(-MOVE_SPEED, 0)
                player.dir = vec2(-1,0)
            })

        //agregamos la dirección derecha
            keyDown('right', () => {
                player.changeSprite('link-derecha')
                player.move(MOVE_SPEED, 0)
                player.dir = vec2(1,0)
            })

        //agregamos la dirección arriba
            keyDown('up', () => {
                player.changeSprite('link-arriba')
                player.move(0, -MOVE_SPEED)
                player.dir = vec2(0,-1)
            })

        //agregamos la dirección abajo
            keyDown('down', () => {
                player.changeSprite('link-abajo')
                player.move(0, MOVE_SPEED)
                player.dir = vec2(0,1)
            })

        //creamos la funcion para atacar al enemigo 
            function spawnkaboom (p) {
                const obj = add([sprite('hit-enemigo'), pos(p), 'hit-enemigo'])
                wait(0.2, () => {
                    destroy(obj)
                })
            }
        //se definine con que boton se ataca
            keyPress('space', () => {
                spawnkaboom(player.pos.add(player.dir.scale(48)))
            })

        //creamos la colicion al atacar
            collides('hit-enemigo', 'enemigo-esqueleto', (k , s) => {
                camShake(4)
                wait(0.2, () => {
                    destroy(k)
                })
                destroy(s)
                scorelabel.value++
                scorelabel.text = scorelabel.value
            })

        //agregaremos movimientos a los enemigos 

            //rebanadora
            const SLICER_SPEED = 100 //VELOCIDAD A LA CUAL SE MOVERA 

            action('enemigo-renabadora', (s) => {
                s.move(s.dir * SLICER_SPEED, 0)
                 //agregaremos movimientos aleatorios
                 s.timer -= dt()
                 if(s.timer <= 0){
                     s.dir = -s.dir
                     s.timer = rand(5)
                 }
            })
            //agregamos la colision que tendra las rebanadoras 
            collides('enemigo-renabadora', 'wall', (s) => {
                s.dir =-s.dir
            })

            //esceleto 
            const ESQUELETO_SPEED = 100 //VELOCIDAD A LA CUAL SE MOVERA 
            action('enemigo-esqueleto', (s) => {
                s.move(0, s.dir * ESQUELETO_SPEED)
                //agregaremos movimientos aleatorios
                    s.timer -= dt()
                    if(s.timer <= 0){
                        s.dir = -s.dir
                        s.timer = rand(5)
                    }
            })
            //agregamos la colision que tendra las rebanadoras 
            collides('enemigo-esqueleto', 'wall', (s) => {
                s.dir = -s.dir
            })
            

            player.overlaps('dangerous', () => {
                go('lose', { score: scorelabel.value })
            })
})

scene("lose", ({ score }) =>{
    add([text(score, 32), origin('center'), pos(width()/ 2, height()/ 2)])
})

start("game", { level: 0, score:0 })
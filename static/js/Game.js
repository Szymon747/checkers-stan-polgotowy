console.log("game")

class Game {

    constructor() {
        this.onruch=1

        this.warcabnica = [                //tworzenie szachownicy

            [1, 0, 1, 0, 1, 0, 1, 0],
            [0, 1, 0, 1, 0, 1, 0, 1],
            [1, 0, 1, 0, 1, 0, 1, 0],
            [0, 1, 0, 1, 0, 1, 0, 1],
            [1, 0, 1, 0, 1, 0, 1, 0],
            [0, 1, 0, 1, 0, 1, 0, 1],
            [1, 0, 1, 0, 1, 0, 1, 0],
            [0, 1, 0, 1, 0, 1, 0, 1],
        ];


        this.pionki = [

            [0, 2, 0, 2, 0, 2, 0, 2],
            [2, 0, 2, 0, 2, 0, 2, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 1, 0, 1, 0, 1, 0, 1],
            [1, 0, 1, 0, 1, 0, 1, 0],

        ];
        var pionekselected = {}
        var poleselected = {}
        var ispoleselected
        var ispionekselected



        console.log(this)


        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(45, 4 / 3, 0.1, 10000);
        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setClearColor(0x0066ff);
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        document.getElementById("root").append(this.renderer.domElement);


        const axes = new THREE.AxesHelper(1000)
        this.scene.add(axes)
        this.camera.position.set(100, 50, 0)
        this.camera.lookAt(this.scene.position)


        let materialczerwony = new THREE.MeshBasicMaterial({
            side: THREE.DoubleSide,
            wireframe: false,
            transparent: true,
            opacity: 1,
            map: new THREE.TextureLoader().load("gfx/czerwone.jpg")
        });
        let materialszary = new THREE.MeshBasicMaterial({
            side: THREE.DoubleSide,
            wireframe: false,
            transparent: true,
            opacity: 1,
            map: new THREE.TextureLoader().load("gfx/szare.jpg")
        });
        let materialczarny = new THREE.MeshBasicMaterial({
            side: THREE.DoubleSide,
            wireframe: false,
            transparent: true,
            opacity: 1,
            map: new THREE.TextureLoader().load("gfx/czarne.jpg")
        });
        let materialbialy = new THREE.MeshBasicMaterial({
            side: THREE.DoubleSide,
            wireframe: false,
            transparent: true,
            opacity: 1,
            map: new THREE.TextureLoader().load("gfx/biale.jpg")
        });



        for (let i = 0; i < 8; i++) {
            for (let y = 0; y < 8; y++) {
                const klocplanszy = new THREE.BoxGeometry(10, 1, 10);          //tworzenie planszy z prostopadloscianow
                var materialklocplanszy

                if ((i % 2 == 0 && y % 2 == 0) || (i % 2 == 1 && y % 2 == 1)) {
                    materialklocplanszy = materialbialy
                }
                else {
                    materialklocplanszy = materialczarny
                }
                const cube = new THREE.Mesh(klocplanszy, materialklocplanszy);
                cube.rodzaj = "pole"
                cube.x = i;
                cube.y = y;
                cube.name = i + "" + y
                console.log(cube.name)
                cube.position.set(i * 10 - 35, 0, y * 10 - 35)
                this.scene.add(cube);




                //tworezenie pionków z walcy
                if (this.pionki[i][y] == 1 || this.pionki[i][y] == 2) {
                    const pionekgeometry = new THREE.CylinderGeometry(4, 4, 2, 32);
                    var materialpionek

                    if (this.pionki[i][y] == 1) {
                        materialpionek = materialbialy
                    }
                    else {
                        materialpionek = materialszary
                    }

                    const pionek = new THREE.Mesh(pionekgeometry, materialpionek);
                    pionek.rodzaj = "pionek"
                    pionek.x = i;
                    pionek.y = y;
                    //  cube.name = i + "" + y
                    pionek.position.set(i * 10 - 35, 2, y * 10 - 35)
                    this.scene.add(pionek);
                }
            }
        }
        function ruch(pionek, pole) {
            console.log(pionek, pole)
            console.log(pionek.position)
            pionek.position.set = pole.position
        }




        //raycaster
        const raycaster = new THREE.Raycaster();
        const mouseVector = new THREE.Vector2()

        var podswietl1 = {}
        var podswietl2 = {}
        podswietl1.material = materialczarny
        podswietl2.material = materialczarny

        window.addEventListener("mousedown", (e) => {
            if (gamestarted) {
                mouseVector.x = (event.clientX / window.innerWidth) * 2 - 1;
                mouseVector.y = -(event.clientY / window.innerHeight) * 2 + 1;

                raycaster.setFromCamera(mouseVector, this.camera);
                const intersects = raycaster.intersectObjects(this.scene.children);

                if (intersects.length > 0) {
                    if (intersects[0].object.rodzaj == "pionek") {
                        if (ispionekselected) {
                            if (color == "1") {                                     //odkolorowanie po ruchu                    
                                pionekselected.material = materialbialy
                                podswietl1.material = materialczarny
                                podswietl2.material = materialczarny
                            }
                            if (color == "2") {
                                pionekselected.material = materialszary
                                podswietl1.material = materialczarny
                                podswietl2.material = materialczarny
                            }
                        }
                        console.log(color, " : ", this.pionki[intersects[0].object.x][intersects[0].object.y])
                        if (color == this.pionki[intersects[0].object.x][intersects[0].object.y]) {
                            if (color == "1") {                                 //podmianka koloru na poprzednio wybranym
                                pionekselected.material = materialbialy
                            }
                            if (color == "2") {
                                pionekselected.material = materialszary
                            }

                            pionekselected = intersects[0].object                   //działania na aktualnie wybranym
                            console.log(pionekselected.material)
                            pionekselected.material = materialczerwony
                            console.log(pionekselected.material)
                            ispionekselected = true
                            ispoleselected = false




                            let pionekwspol = {                                                                                     //PODSWIETLANIE PÓL
                                x: pionekselected.x,
                                y: pionekselected.y,
                            }

                            if (color == "1") {

                                if (pionekwspol.y - 1 < 8 && pionekwspol.y - 1 >= 0) {



                                    podswietl1 = this.scene.getObjectByName((pionekwspol.x - 1) + "" + (pionekwspol.y - 1))
                                    podswietl1.material = materialczerwony
                                }

                                if (pionekwspol.y + 1 < 8 && pionekwspol.y + 1 >= 0) {
                                    podswietl2 = this.scene.getObjectByName((pionekwspol.x - 1) + "" + (pionekwspol.y + 1))
                                    podswietl2.material = materialczerwony
                                }
                            }
                            else {
                                if (pionekwspol.y + 1 < 8 && pionekwspol.y + 1 >= 0) {
                                    podswietl1 = this.scene.getObjectByName((pionekwspol.x + 1) + "" + (pionekwspol.y + 1))
                                    podswietl1.material = materialczerwony
                                }
                                if (pionekwspol.y - 1 < 8 && pionekwspol.y - 1 >= 0) {
                                    podswietl2 = this.scene.getObjectByName((pionekwspol.x + 1) + "" + (pionekwspol.y - 1))
                                    podswietl2.material = materialczerwony
                                }
                            }


                        }

                        else {
                            console.log("nie twoj pionek")
                        }
                    }
                    if (intersects[0].object.rodzaj == "pole") {
                        if (ispionekselected == true) {
                            console.log(this.warcabnica[intersects[0].object.x][intersects[0].object.y])
                            if (this.warcabnica[intersects[0].object.x][intersects[0].object.y] == 0) {

                                poleselected = intersects[0].object
                                console.log(poleselected.position.x)

                                if (poleselected.material == materialczerwony) {
                                    if (this.pionki[intersects[0].object.x][intersects[0].object.y] ==  0) {
                                        this.pionki[pionekselected.x][pionekselected.y] =  0
                                        game.move(poleselected, pionekselected)
                                    }
                                }




                                if (color == "1") {                                     //odkolorowanie po ruchu                    
                                    pionekselected.material = materialbialy
                                    if (podswietl1.material == materialczerwony) {
                                        podswietl1.material = materialczarny
                                    }
                                    if (podswietl2.material == materialczerwony) {
                                        podswietl2.material = materialczarny
                                    }
                                }
                                if (color == "2") {
                                    pionekselected.material = materialszary
                                    if (podswietl1.material == materialczerwony) {
                                        podswietl1.material = materialczarny
                                    }
                                    if (podswietl2.material == materialczerwony) {
                                        podswietl2.material = materialczarny
                                    }
                                }



                                ispionekselected = false
                                poleselected = false
                            }
                        }
                    }
                }
            }
        });



        this.render() // wywołanie metody render


    }


    move(poleselected, pionekselected) {
        net.ruch(pionekselected,poleselected)
        this.warcabnica[pionekselected.x][pionekselected.y] = 0
        console.log("MOVE")
        let diference = {
            x: poleselected.position.x - pionekselected.position.x,
            z: poleselected.position.z - pionekselected.position.z
        }


        let i = 0
        let movement = setInterval(function () {
            i++;
            if (i == 100) {
                console.log("WYLACZ INTERVALA")
                clearInterval(movement);
            }
            // console.log(i)


            pionekselected.position.set(
                pionekselected.position.x + diference.x / 100,
                pionekselected.position.y,
                pionekselected.position.z + diference.z / 100)//wykonanie ruchu animacja


        }, 10);



        // pionekselected.position.set(
        //     pionekselected.position.x + diference.x,
        //     pionekselected.position.y,
        //     pionekselected.position.z + diference.z)
        pionekselected.x = poleselected.x
        pionekselected.y = poleselected.y
        // pionekselected.name = poleselected.x + "" + poleselected.y
        this.pionki[poleselected.x][poleselected.y] = parseInt(color)
        console.log(this.pionki)
    }
    gamestarted() {
        console.log("gamestarted")
        if (color == "2") {
            this.camera.position.set(-100, 50, 0)
            this.camera.lookAt(this.scene.position)
            console.log("jestem graczem", color)
        }
        document.getElementById("status").innerHTML = "status: rozpoczęto grę"
    }
    render = () => {
        requestAnimationFrame(this.render);
        this.renderer.render(this.scene, this.camera);
        console.log("render leci")
    }


}
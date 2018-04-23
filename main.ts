
/**
 * Use this file to define custom functions and blocks.
 * Read more at https://makecode.microbit.org/blocks/custom
 */


/**
 * Kontrola ekrana
 */
//% weight=70 icon="\uf108" color=#EC7505
namespace ekran {
    /**
     * Obriši ekran
     */
    //% blockId=obrisi block="obriši ekran"
    export function obrisi(): void {
        serial.writeString("CLS\n");
    }

    /**
     * Ispiši
     */
    //% blockId=ispisi
    //% block="ispiši tekst %tekst| na poziciji  x %x|  y %y"
    //% blockExternalInputs=true
    export function ispisi(tekst: string, x: number, y: number): void {
        serial.writeString(tekst + ";" + x.toString() + ";" + y.toString() + "\n");
    }
}

enum KojiMotor {
    //% block="motor 1"
    motor01 = 1,
    //% block="motor 2"
    motor02 = 2,
    //% block="motor 3"
    motor03 = 3,
    //% block="motor 4"
    motor04 = 4
}

enum KojeStanje {
    //% block="stop"
    stop,
    //% block="smjer A"
    smjer_a,
    //% block="smjer B"
    smjer_b
}

let motorPinMapa = {
    1: [DigitalPin.P8, DigitalPin.P9],
    2: [DigitalPin.P10, DigitalPin.P12],
    3: [DigitalPin.P13, DigitalPin.P14],
    4: [DigitalPin.P15, DigitalPin.P16],
};

/**
 * Custom blocks
 */
//% weight=100 color=#0fbc11 icon=""
namespace motor {

    //% weight=100
    //% blockId=motor
    //% block="%kojeg"
    export function motor(kojeg: KojiMotor): number {
        return <number>kojeg;
    }

    //% weight=99
    //% blockId=stanje
    //% block="%koje"
    export function stanje(koje: KojeStanje): string {
        switch (koje) {
            case KojeStanje.stop: return "stop";
            case KojeStanje.smjer_a: return "smjer_a";
            case KojeStanje.smjer_b: return "smjer_b";
            default: return null;
        }
    }

    /**
     * Promjeni stanje motora
     */
    //% weight=98
    //% blockId=promjeni_stanje
    //% block="promjeni stanje| motora  %broj_motora|  u %stanje"
    //% blockExternalInputs=true
    export function promjeni_stanje(broj_motora: number, stanje: string): void {
        let p = motorPinMapa[broj_motora];

        switch (stanje) {
            case "smjer_a":
                pins.digitalWritePin(p[0], 1);
                pins.digitalWritePin(p[1], 0);
                break;
            case "smjer_b":
                pins.digitalWritePin(p[0], 0);
                pins.digitalWritePin(p[1], 1);
                break;
            case "stop":
                pins.digitalWritePin(p[0], 0);
                pins.digitalWritePin(p[1], 0);
                break;
            default:
                pins.digitalWritePin(p[0], 0);
                pins.digitalWritePin(p[1], 0);
                break;
        }
    }

    //%

    /**
     * Stopiraj motor
     */
    //% weight=97
    //% blockId=motor_stop
    //% block="stopiraj motor %broj_motora"
    export function stop(broj_motora: number): void {
        promjeni_stanje(broj_motora, "stop");
    }

    /**
     * Vrti motor u smjeru A
     */
    //% weight=96
    //% blockId=motor_vrtiA
    //% block="vrti motor %broj_motora| u smjeru A"
    export function smjerA(broj_motora: number): void {
        promjeni_stanje(broj_motora, "smjer_a");
    }

    /**
     * Vrti motor u smjeru B
     */
    //% weight=95
    //% blockId=motor_vrtiB
    //% block="vrti motor %broj_motora| u smjeru B"
    export function smjerB(broj_motora: number): void {
        promjeni_stanje(broj_motora, "smjer_b");
    }

    // //% weight=100
    // //% block
    // export function motor01() { return 1; }

    // //% weight=99
    // //% block
    // export function motor02() { return 2; }

    // //% weight=98
    // //% block
    // export function motor03() { return 3; }

    // //% weight=97
    // //% block
    // export function motor04() { return 4; }

    // //% block="MyEnum"
    // export enum MyEnum {
    //     //% block="one"
    //     One = 1,
    //     //% block="two"
    //     Two = 2
    // }

    // //% block
    // export function one(): MyEnum {
    //     return MyEnum.One;
    // }

    // /**
    //  * TODO: describe your function here
    //  * @param n describe parameter here, eg: 5
    //  * @param s describe parameter here, eg: "Hello"
    //  * @param e describe parameter here
    //  */    
    // //% block
    // export function foo(n: number, s: string, e: MyEnum): void {
    //     // Add code here
    // }

    // /**
    //  * TODO: describe your function here
    //  * @param value describe value here, eg: 5
    //  */    
    // //% block
    // export function fib(value: number): number {
    //     return value <= 1 ? value : fib(value -1) + fib(value - 2);
    // }
}

/// <reference path="../../node_modules/pxt-microbit/built/sim.d.ts" />

// /**
//  * Types of tropical fruit
//  */
// enum TropicalFruit {
//     Banana = 0,
//     Pinapple = 1,
//     Coconut = 2
// }


export const enum MotorStanje {
    Stop = 0,
    SmjerB = 1,
    SmjerA = 2
}

export const enum MotorID {
    M01 = 0,
    M02 = 1,
    M03 = 2,
    M04 = 3
}

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
    export function ispisi(tekst :string, x :number, y :number): void {
        serial.writeString(tekst + ";" + x.toString() + ";" + y.toString() + "\n");
    }
}

/**
 * Kontrola motora
 */
//% weight=70 icon="\uf0e2" color=#EC7505
namespace motor {
    let motorPinMapa : { [i:number]: DigitalPin[] } = {
        [MotorID.M01]: [DigitalPin.P8, DigitalPin.P9],
        [MotorID.M02]: [DigitalPin.P10, DigitalPin.P12],
        [MotorID.M03]: [DigitalPin.P13, DigitalPin.P14],
        [MotorID.M04]: [DigitalPin.P15, DigitalPin.P16],
    };

    /**
     * Stopiraj motor
     */
    //% blockId=motor_stop
    //% block="stopiraj motor %koji"
    export function stop(koji :MotorID): void {
        promjeni_stanje(koji, MotorStanje.Stop);
    }

    /**
     * Vrti motor u smjeru A
     */
    //% blockId=motor_vrtiA
    //% block="vrti motor %koji| u smjeru A"
    export function smjerA(koji :MotorID): void {
        promjeni_stanje(koji, MotorStanje.SmjerA);
    }

    /**
     * Vrti motor u smjeru B
     */
    //% blockId=motor_vrtiB
    //% block="vrti motor %koji| u smjeru B"
    export function smjerB(koji :MotorID): void {
        promjeni_stanje(koji, MotorStanje.SmjerB);
    }

    /**
     * Promjeni stanje motora
     */
    //% blockId=promjeni_stanje
    //% block="promjeni stanje| motora  %koji|  u %stanje"
    //% blockExternalInputs=true
    export function promjeni_stanje(koji :MotorID, stanje :MotorStanje): void {
        var p = motorPinMapa[koji];

        switch(stanje) {
            case MotorStanje.SmjerA:
                pins.digitalWritePin(p[0], 1);
                pins.digitalWritePin(p[1], 0);
                break;
            case MotorStanje.SmjerB:
                pins.digitalWritePin(p[0], 0);
                pins.digitalWritePin(p[1], 1);
                break;
            case MotorStanje.Stop:
            default:
                pins.digitalWritePin(p[0], 0);
                pins.digitalWritePin(p[1], 0);
                break;
        }
    }
}
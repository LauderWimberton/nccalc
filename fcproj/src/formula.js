const MathLibrary = {
    PI: 3.14159265359,

    degreesToRadians: function(degrees) {
        return degrees * (this.PI / 180);
    },

    sin: function(degrees) {
        return Math.sin(this.degreesToRadians(degrees));
    },

    cos: function(degrees) {
        return Math.cos(this.degreesToRadians(degrees));
    },

    tan: function(degrees) {
        return Math.tan(this.degreesToRadians(degrees));
    },

    sqrt: function(x) {
        if (x < 0) {
            throw new Error("Cannot calculate square root of a negative number");
        }
        return Math.sqrt(x);
    },

    log: function(base, x) {
        if (base <= 0 || base === 1 || x <= 0) {
            throw new Error("Invalid input for logarithm");
        }
        return Math.log(x) / Math.log(base);
    }
};

window.MathLibrary = MathLibrary;
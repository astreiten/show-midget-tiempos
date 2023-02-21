export function isNumeric(str) {
  if (typeof str != "string") return false; // we only process strings!
  return (
    !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
    !isNaN(parseFloat(str))
  ); // ...and ensure strings of whitespace fail
}

export function sortPositionsAux(positionA, positionB) {
  if (positionA.tiempoFinal < positionB.tiempoFinal) return -1;
  if (positionA.tiempoFinal > positionB.tiempoFinal) return 1;
  return 0;
}

export const filterFilas = (filas) => {
  return filas.filter((fila) => {
    return (
      isNumeric(fila.words[0].text) &&
      fila.words[fila.words.length - 1].text === "05" &&
      !fila.words[
        fila.words.lastIndexOf(
          fila.words.findLast((element) => {
            return element.text.startsWith("99:");
          })
        )
      ] &&
      !fila.words[
        fila.words.lastIndexOf(
          fila.words.findLast((element) => {
            return element.text.startsWith("00:");
          })
        )
      ]
    );
  });
};

function getApellido(fila) {
  if (fila.words[1].text.length <= 2)
    return fila.words[1].text + " " + fila.words[2].text;
  else return fila.words[1].text;
}

export const buildPositions = (filas) => {
  return filas.map((fila) => {
    return {
      numero: fila.words[0].text,
      apellido: getApellido(fila),
      tiempoFinal:
        fila.words[
          fila.words.lastIndexOf(
            fila.words.findLast((element) => {
              return element.text.startsWith("01:");
            })
          )
        ].text,
    };
  });
};

export function isSerieCargada(i, seriesCargadas) {
  return seriesCargadas.find((e) => e === i);
}

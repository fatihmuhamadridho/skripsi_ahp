export interface bobot_kriteriaProps {
  periode: Date;
  name: string;
  kriteria_order: number[];
  nilai_kriteria: Array<{
    kriteria_id: number;
    kriteria_pembanding_id: number;
    bobot: number;
  }>;
  matriks_kriteria: number[][];
  total_matriks_kriteria: number[];
  matriks_nilai_kriteria: number[][];
  nilai_jumlah_kriteria: number[];
  nilai_prioritas_kriteria: number[];
  nilai_eigen_kriteria: number[];
  total_matriks_nilai_kriteria: number[];
  ci: number;
  ri: number;
  cr: number;
}

export class EntryNilaiKriteriaUtils {
  static initialValues: bobot_kriteriaProps = {
    periode: new Date(),
    name: "",
    kriteria_order: [0, 0, 0],
    nilai_kriteria: [
      { kriteria_id: 0, kriteria_pembanding_id: 0, bobot: 0 },
      { kriteria_id: 0, kriteria_pembanding_id: 0, bobot: 0 },
      { kriteria_id: 0, kriteria_pembanding_id: 0, bobot: 0 },
    ],
    matriks_kriteria: [
      [1, 0, 0],
      [0, 1, 0],
      [0, 0, 1],
    ],
    total_matriks_kriteria: [1, 1, 1],
    matriks_nilai_kriteria: [
      [1, 0, 0],
      [0, 1, 0],
      [0, 0, 1],
    ],
    nilai_jumlah_kriteria: [1, 1, 1],
    nilai_prioritas_kriteria: [0.333, 0.333, 0.333],
    nilai_eigen_kriteria: [0.333, 0.333, 0.333],
    total_matriks_nilai_kriteria: [1, 1, 1, 1, 0.999, 0.999],
    ci: (0.999 - 3) / (3 - 1),
    ri: 0.58,
    cr: (0.999 - 3) / (3 - 1) / 0.58,
  };

  static onChangeSelectKriteriaId(
    callback: (field: string, value: any) => void,
    kriteria_order: number[],
    index: number,
    value: number
  ) {
    this.kriteriaOrderDuplicateAlert(kriteria_order, value);
    const newKriteriaOrder = this.updateKriteriaOrder(
      kriteria_order,
      index,
      value
    );
    const newNilaiKriteria = this.autoUpdateNilaiKriteria(newKriteriaOrder);
    callback("kriteria_order", newKriteriaOrder);
    callback("nilai_kriteria", newNilaiKriteria);
  }

  static kriteriaOrderDuplicateAlert(kriteria_order: number[], value: number) {
    if (kriteria_order.includes(Number(value)))
      return alert("Tidak bisa memilih kriteria yang sama");
  }

  static updateKriteriaOrder(
    kriteria_order: number[],
    index: number,
    value: number
  ) {
    const newKriteria = [...kriteria_order];
    newKriteria[index] = Number(value);
    return newKriteria;
  }

  static autoUpdateNilaiKriteria(kriteria_order: number[]) {
    return kriteria_order.flatMap((kriteria_id: number, i: number) => {
      return kriteria_order
        .slice(i + 1)
        .map((kriteria_pembanding_id: number) => {
          return {
            kriteria_id,
            kriteria_pembanding_id,
            bobot: 0, // Atur bobot ke nilai default
          };
        });
    });
  }

  static onClickDeleteKriteria(
    callback: (field: string, value: any) => void,
    kriteria_order: number[],
    index: number
  ) {
    EntryNilaiKriteriaUtils.kriteriaOrderMinKriteriaAlert(kriteria_order);
    const newKriteria = EntryNilaiKriteriaUtils.deleteKriteriaOrder(
      kriteria_order,
      index
    );
    callback("kriteria_order", newKriteria);
    callback(
      "nilai_kriteria",
      EntryNilaiKriteriaUtils.updateNilaiKriteriaDeleted(newKriteria)
    );
  }

  static kriteriaOrderMinKriteriaAlert(kriteria_order: number[]) {
    if (kriteria_order.length === 3)
      return alert("Anda harus memiliki 3 kriteria yang dipilih");
  }

  static deleteKriteriaOrder(kriteria_order: number[], index: number) {
    return kriteria_order.filter(
      (_: any, itemIndex: number) => itemIndex !== index
    );
  }

  static updateNilaiKriteriaDeleted(kriteria_order: number[]) {
    return kriteria_order.flatMap((kriteria_id: number, index: number) => {
      return kriteria_order
        .slice(index + 1)
        .map((kriteria_pembanding_id: number) => {
          return {
            kriteria_id,
            kriteria_pembanding_id,
          };
        });
    });
  }
}

import React, { useEffect, useState } from "react";
import { Document, Page, Text, View, PDFViewer } from "@react-pdf/renderer";
import Html from "react-pdf-html";
import { renderToString } from "react-dom/server";
import { useRouter } from "next/router";
import { useGetOneAnalisaKriteria } from "@/services/analisaKriteriaService";
import { upperCase } from "lodash";

// Create Document Component
const DetailLaporan = () => {
  const router = useRouter();
  const { kategori_id }: { [key: string]: any } = router.query;
  const { data: detailKategori } = useGetOneAnalisaKriteria(kategori_id);
  const [render, setRender] = useState<boolean>(false);

  useEffect(() => {
    setRender(true);
  }, []);

  if (!render || !detailKategori) return null;
  return (
    <>
      <style jsx global>{`
        body {
          margin: 0;
          padding: 0;
          overflow: hidden;
        }
      `}</style>
      <PDFViewer style={{ width: "100vw", height: "100vh" }}>
        <Document title={upperCase(detailKategori?.name) + " DESEMBER 2023"}>
          <Page
            size="A4"
            style={{
              paddingHorizontal: 32,
              paddingVertical: 32,
            }}
          >
            <View style={{ alignItems: "center", justifyContent: "center" }}>
              <View style={{ fontSize: 18, fontWeight: "ultrabold" }}>
                <Text>PT BNG CONSULTING</Text>
              </View>
              <View style={{ marginVertical: 4 }} />
              <Text style={{ fontSize: 9 }}>
                Alamat: Ruko Apartemen Brooklyn Blok B No 08P, Pakualam, Kec.
                Serpong Utara, Tangerang, Banten 15320
              </Text>
              <View style={{ marginVertical: 6 }} />
              <View
                style={{
                  width: "100%",
                  height: 1,
                  backgroundColor: "black",
                }}
              />
              <View style={{ marginVertical: 0.5 }} />
              <View
                style={{
                  width: "100%",
                  height: 0.5,
                  backgroundColor: "black",
                }}
              />
              <View style={{ marginVertical: 6 }} />
              <Text style={{ fontSize: 13 }}>
                HASIL ANALISA DATA {upperCase(detailKategori?.name)}
              </Text>
              <Text style={{ fontSize: 13 }}>
                PERIODE {detailKategori?.periode}
              </Text>
              <View style={{ marginVertical: 6 }} />
              <View style={{ width: "100%" }}>
                <Html>
                  {renderToString(
                    <table style={{ border: "1px solid black" }}>
                      <tr style={{ backgroundColor: "#B6BBC4", fontSize: 11 }}>
                        <th style={{ padding: 4 }}>Nama Kriteria</th>
                        <th style={{ padding: 4 }}>Bobot</th>
                      </tr>
                      {detailKategori?.AnalisaKriteria?.prioritas_bobot?.map(
                        (item: any, index: number) => (
                          <tr
                            key={index}
                            style={{
                              display: "flex",
                              flexDirection: "row",
                              fontSize: 11,
                            }}
                          >
                            <td style={{ padding: "2px 4px" }}>
                              {item.kriteria.name}
                            </td>
                            <td style={{ padding: "2px 4px" }}>{item.value}</td>
                          </tr>
                        )
                      )}
                    </table>
                  )}
                </Html>
              </View>
              <View style={{ marginVertical: 2 }} />
              <Text style={{ fontSize: 8, alignSelf: "center" }}>
                Tabel 1. Tabel Analisa Kriteria
              </Text>
              <View style={{ marginVertical: 6 }} />
              <View style={{ width: "100%" }}>
                <Html>
                  {renderToString(
                    <table style={{ border: "1px solid black" }}>
                      <tr style={{ backgroundColor: "#B6BBC4", fontSize: 11 }}>
                        <th style={{ padding: 4 }}>Nama Lengkap</th>
                        <th style={{ padding: 4 }}>Nilai Akhir</th>
                        <th style={{ padding: 4 }}>Ranking</th>
                      </tr>
                      {detailKategori?.AnalisaAlternatif?.sort(
                        (a: any, b: any) => b.total_bobot - a.total_bobot
                      ).map((item: any, index: number) => (
                        <tr
                          key={index}
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            fontSize: 11,
                          }}
                        >
                          <td style={{ padding: "2px 4px" }}>
                            {item.Alternatif.dataJson.fullname}
                          </td>
                          <td style={{ padding: "2px 4px" }}>
                            {item.total_bobot}
                          </td>
                          <td style={{ padding: "2px 4px" }}>{index + 1}</td>
                        </tr>
                      ))}
                    </table>
                  )}
                </Html>
              </View>
              <View style={{ marginVertical: 2 }} />
              <Text style={{ fontSize: 8, alignSelf: "center" }}>
                Tabel 2. Tabel Analisa Alternatif
              </Text>
            </View>
          </Page>
        </Document>
      </PDFViewer>
    </>
  );
};

export default DetailLaporan;

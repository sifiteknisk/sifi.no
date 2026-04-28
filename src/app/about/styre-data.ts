export type BoardMember = {
  name: string;
  role: string;
  image?: string;
  images?: string[];
  anonymous?: boolean;
};

export type BoardYear = {
  groupPhoto: string;
  members: BoardMember[];
};

const styretImagePath = (year: number, fileName: string) =>
  `/images/Styret/${year}/${fileName}`;
export const placeholderImage = '/images/spørsmål.png';

export const boards: Record<number, BoardYear> = {
  2025: {
    groupPhoto: styretImagePath(2025, 'Styret25ny.jpeg'),
    members: [
      {
        name: 'Pernille Vannebo',
        role: 'Leder',
        image: styretImagePath(2025, 'PernilleLeder.jpeg'),
      },
      {
        name: 'Tobias With Thorsen',
        role: 'Nestleder',
        image: styretImagePath(2025, 'TobiasNestleder.jpeg'),
      },
      {
        name: 'Vegard Otterlei',
        role: 'Økonomiansvarlig',
        image: styretImagePath(2025, 'VegardØkonomi.jpeg'),
      },
      {
        name: 'Magnus Økstad',
        role: 'Bedriftskontakt',
        image: styretImagePath(2025, 'MagnusBedrift.jpeg'),
      },
      {
        name: 'Julia Vister',
        role: 'PR',
        image: styretImagePath(2025, 'JuliaPR.jpeg'),
      },
      {
        name: 'Adrian Skansen',
        role: 'Arrangementansvarlig',
        image: styretImagePath(2025, 'AdrianArrangement.jpeg'),
      },
      {
        name: 'Ahmed Abdulahi Ahmed',
        role: 'Styremedlem',
        image: styretImagePath(2025, 'AhmedStyremedlem.jpeg'),
      },
      {
        name: 'Emil Johannessen',
        role: 'Styremedlem',
        image: styretImagePath(2025, 'EmilStyremedlem.jpeg'),
      },
      {
        name: 'Sindre Vikre',
        role: 'Styremedlem',
        image: styretImagePath(2025, 'SindreStyremedlem.jpeg'),
      },
    ],
  },
  2026: {
    groupPhoto: styretImagePath(2026, 'styret26.jpg'),
    members: [
      {
        name: 'Birk',
        role: 'Leder',
        image: styretImagePath(2026, 'birk.jpg'),
        images: [
          styretImagePath(2026, 'birk.jpg'),
          styretImagePath(2026, 'birk-1.jpg'),
          styretImagePath(2026, 'birk-2.jpg'),
          styretImagePath(2026, 'birk-3.jpg'),
          styretImagePath(2026, 'birk-4.jpg'),
        ],
      },
      {
        name: 'Inga',
        role: 'Nestleder',
        image: styretImagePath(2026, 'anon.jpg'),
        anonymous: true,
      },
      {
        name: 'Hanne',
        role: 'Økonomiansvarlig',
        image: styretImagePath(2026, 'hanne.jpg'),
      },
      {
        name: 'Kristian',
        role: 'Bedriftskontakt',
        image: styretImagePath(2026, 'anon.jpg'),
        anonymous: true,
      },
      {
        name: 'Nathaniel',
        role: 'PR',
        image: styretImagePath(2026, 'nathaniel.jpg'),
      },
      {
        name: 'Andrew',
        role: 'Arrangementansvarlig',
        image: styretImagePath(2026, 'andrew-1.jpg'),
        images: [
          styretImagePath(2026, 'andrew.jpg'),
          styretImagePath(2026, 'andrew-1.jpg'),
        ],
      },
      {
        name: 'Fabian',
        role: 'Teknisk ansvarlig',
        image: styretImagePath(2026, 'fabian.jpg'),
        images: [
          styretImagePath(2026, 'fabian-1.jpg'),
          styretImagePath(2026, 'fabian-2.jpg'),
          styretImagePath(2026, 'fabian.jpg'),
        ],
      },
      {
        name: 'Anna',
        role: 'Styremedlem',
        image: styretImagePath(2026, 'anna.jpg'),
      },
      {
        name: 'Even',
        role: 'Styremedlem',
        image: styretImagePath(2026, 'even.jpg'),
      },
    ],
  },
  2027: {
    groupPhoto: placeholderImage,
    members: [
      { name: 'Ny leder', role: 'Leder', image: placeholderImage },
      { name: 'Ny nestleder', role: 'Nestleder', image: placeholderImage },
      { name: 'Ny økonomi', role: 'Økonomiansvarlig', image: placeholderImage },
      { name: 'Ny bedrift', role: 'Bedriftskontakt', image: placeholderImage },
      { name: 'Ny pr', role: 'PR', image: placeholderImage },
      {
        name: 'Ny arr',
        role: 'Arrangementansvarlig',
        image: placeholderImage,
      },
      {
        name: 'Ny teknisk',
        role: 'Teknisk ansvarlig',
        image: placeholderImage,
      },
      { name: 'Ny medlem1', role: 'Styremedlem', image: placeholderImage },
      { name: 'Ny medlem2', role: 'Styremedlem', image: placeholderImage },
    ],
  },
};

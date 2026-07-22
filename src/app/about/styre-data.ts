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
    groupPhoto: styretImagePath(2025, 'Styret25.webp'),
    members: [
      {
        name: 'Pernille Vannebo',
        role: 'Leder',
        image: styretImagePath(2025, 'PernilleLeder.webp'),
      },
      {
        name: 'Tobias With Thorsen',
        role: 'Nestleder',
        image: styretImagePath(2025, 'TobiasNestleder.webp'),
      },
      {
        name: 'Vegard Otterlei',
        role: 'Økonomiansvarlig',
        image: styretImagePath(2025, 'VegardØkonomi.webp'),
      },
      {
        name: 'Magnus Økstad',
        role: 'Bedriftskontakt',
        image: styretImagePath(2025, 'MagnusBedrift.webp'),
      },
      {
        name: 'Julia Vister',
        role: 'PR',
        image: styretImagePath(2025, 'JuliaPR.webp'),
      },
      {
        name: 'Adrian Skansen',
        role: 'Arrangementansvarlig',
        image: styretImagePath(2025, 'AdrianArrangement.webp'),
      },
      {
        name: 'Ahmed Abdulahi Ahmed',
        role: 'Styremedlem',
        image: styretImagePath(2025, 'AhmedStyremedlem.webp'),
      },
      {
        name: 'Emil Johannessen',
        role: 'Styremedlem',
        image: styretImagePath(2025, 'EmilStyremedlem.webp'),
      },
      {
        name: 'Sindre Vikre',
        role: 'Styremedlem',
        image: styretImagePath(2025, 'SindreStyremedlem.webp'),
      },
    ],
  },
  2026: {
    groupPhoto: styretImagePath(2026, 'styret26.webp'),
    members: [
      {
        name: 'Birk',
        role: 'Leder',
        image: styretImagePath(2026, 'birk.webp'),
        images: [
          styretImagePath(2026, 'birk.webp'),
          styretImagePath(2026, 'birk-1.webp'),
          styretImagePath(2026, 'birk-2.webp'),
          styretImagePath(2026, 'birk-3.webp'),
          styretImagePath(2026, 'birk-4.webp'),
        ],
      },
      {
        name: 'Inga',
        role: 'Nestleder',
        image: styretImagePath(2026, 'anon.webp'),
        anonymous: true,
      },
      {
        name: 'Hanne',
        role: 'Økonomiansvarlig',
        image: styretImagePath(2026, 'hanne.webp'),
      },
      {
        name: 'Kristian',
        role: 'Bedriftskontakt',
        image: styretImagePath(2026, 'anon.webp'),
        anonymous: true,
      },
      {
        name: 'Nathaniel',
        role: 'PR',
        image: styretImagePath(2026, 'nathaniel.webp'),
      },
      {
        name: 'Andrew',
        role: 'Arrangementansvarlig',
        image: styretImagePath(2026, 'andrew-1.webp'),
        images: [
          styretImagePath(2026, 'andrew.webp'),
          styretImagePath(2026, 'andrew-1.webp'),
        ],
      },
      {
        name: 'Fabian',
        role: 'Teknisk ansvarlig',
        image: styretImagePath(2026, 'fabian.webp'),
        images: [
          styretImagePath(2026, 'fabian-1.webp'),
          styretImagePath(2026, 'fabian-2.webp'),
          styretImagePath(2026, 'fabian.webp'),
        ],
      },
      {
        name: 'Anna',
        role: 'Styremedlem',
        image: styretImagePath(2026, 'anna.webp'),
      },
      {
        name: 'Even',
        role: 'Styremedlem',
        image: styretImagePath(2026, 'even.webp'),
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

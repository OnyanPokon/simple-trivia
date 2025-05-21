import { InputType } from '@/constants';

export const formFields = ({ options }) => [
  {
    label: `Panjang Quiz`,
    name: 'amount',
    type: InputType.SELECT,
    rules: [
      {
        required: true,
        message: `Panjang harus diisi`
      }
    ],
    options: [
      {
        label: '5',
        value: '5'
      },
      {
        label: '10',
        value: '10'
      },
      {
        label: '15',
        value: '15'
      },
      {
        label: '20',
        value: '20'
      }
    ]
  },
  {
    label: `Kategori`,
    name: 'category',
    type: InputType.SELECT,
    options: options.categories.map((item) => ({
      label: item.name,
      value: item.id
    }))
  },
  {
    label: `Kesulitan`,
    name: 'difficulty',
    type: InputType.SELECT,
    options: [
      {
        label: 'Mudah',
        value: 'easy'
      },
      {
        label: 'Normal',
        value: 'normal'
      },
      {
        label: 'Sulit',
        value: 'hard'
      }
    ]
  },
  {
    label: `Token`,
    name: 'token',
    type: InputType.ID_GENERATOR
  }
  // {
  //     label: `Kategori `,
  //     name: 'field',
  //     type: InputType.TEXT,
  // },
  // {
  //     label: `Tipe`,
  //     name: 'type',
  //     type: InputType.SELECT,
  //     rules: [
  //         {
  //             required: true,
  //             message: `Tipe harus diisi`
  //         }
  //     ],
  //     options: [
  //         {
  //             label: 'Belanja',
  //             value: 'belanja'
  //         },
  //         {
  //             label: 'Pendapatan',
  //             value: 'pendapatan'
  //         },
  //         {
  //             label: 'Pengeluaran',
  //             value: 'pengeluaran'
  //         },
  //         {
  //             label: 'Pembiayaan',
  //             value: 'pembiayaan'
  //         }
  //     ]
  // },
  // {
  //     label: `Sumber Anggaran`,
  //     name: 'source_funding',
  //     type: InputType.TEXT,
  //     rules: [
  //         {
  //             required: true,
  //             message: `Sumber Anggaran harus diisi`
  //         }
  //     ]
  // },
  // {
  //     label: `Jumlah Anggaran`,
  //     name: 'budget_amount',
  //     type: InputType.NUMBER,
  //     rules: [
  //         {
  //             required: true,
  //             message: `Jumlah Anggaran harus diisi`
  //         }
  //     ]
  // }
];

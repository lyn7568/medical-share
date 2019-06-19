export const selectHospitalLevel = [
  { label: '一级', value: '1' },
  { label: '二级', value: '2' },
  { label: '三级', value: '3' }
]

export const selectHospitalSubLevel = [
  { label: '特等', value: '1' },
  { label: '甲等', value: '2' },
  { label: '乙等', value: '3' },
  { label: '丙等', value: '4' }
]

export const selectHospitalType = [
  { label: '综合医院', value: '1' },
  { label: '心血管医院', value: '2' },
  { label: '妇产医院', value: '3' },
  { label: '儿童医院', value: '4' },
  { label: '口腔医院', value: '5' },
  { label: '肿瘤医院', value: '6' },
  { label: '传染病医院', value: '7' },
  { label: '精神病医院', value: '8' },
  { label: '其他专科医院', value: '9' }
]

export const slelectDepartType = [
  { label: '内科', value: '1' },
  { label: '外科', value: '2' },
  { label: '妇儿', value: '3' },
  { label: '其他', value: '4' }
]

export const slelectTeachTitle = [
  { label: '教授', value: '1' },
  { label: '副教授', value: '2' },
  { label: '讲师', value: '3' },
  { label: '助理讲师', value: '4' }
]

export const slelectClinicalTitle = [
  { label: '医生', value: '1',
    children: [
      { label: '主任医师', value: '1-1' },
      { label: '副主任医师', value: '1-2' },
      { label: '主治（主管）医师', value: '1-3' },
      { label: '医师', value: '1-4' },
      { label: '医士', value: '1-5' }
    ]
  },
  { label: '药师', value: '2',
    children: [
      { label: '主任药师', value: '2-1' },
      { label: '副主任药师', value: '2-2' },
      { label: '主管医药', value: '2-3' },
      { label: '药师', value: '2-4' },
      { label: '药士', value: '2-5' }
    ]
  },
  { label: '护士', value: '3',
    children: [
      { label: '主任护师', value: '3-1' },
      { label: '副主任护师', value: '3-2' },
      { label: '主管护师', value: '3-3' },
      { label: '护师', value: '3-4' },
      { label: '护士', value: '3-5' }
    ]
  },
  { label: '技师', value: '4',
    children: [
      { label: '主任技师', value: '4-1' },
      { label: '副主任技师', value: '4-2' },
      { label: '主管技师', value: '4-3' },
      { label: '技师、技士', value: '4-4' }
    ]
  }
]
export const slelectUseStatus = [
  { label: '空闲', value: '1' },
  { label: '适中', value: '2' },
  { label: '繁忙', value: '3' }
]

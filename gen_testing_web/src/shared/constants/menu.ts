
export const adminMenu = [
  {
    text: 'Quản lý người dùng',
    path: '/users'
  },
  {
    text: 'Quản lý xét nghiệm',
    path: '/gen_testing'
  },
  {
    text: 'Quản lý gen',
    path: '/gens'
  }
]

export const doctorMenu = [
  {
    text: 'Thử nghiệm gen',
    path: '/gen_testing'
  },
  {
    text: 'Quản lý bệnh nhân',
    path: '/patients'
  }
]

export const patientMenu = [
  {
    text: 'Xem kết quả',
    path: '/patients/my_result'
  },
]

interface Menu {
  [role: string]: any[];
}

export const menu: Menu = {
  'ADMIN': adminMenu,
  'PATIENT': patientMenu,
  'DOCTOR': doctorMenu
}

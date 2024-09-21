
// функция получения актуальных дат на дни недели

export const useGetDateString = function (index) {
  let dateString = ''

  const presentDate = new Date()

  const presentDay = () => {
    if (presentDate.getDay() == 0) {
      return 6
    } else {
      return (presentDate.getDay() - 1)
    }
  } 

  let newDate = new Date(presentDate);

  let date 
  let month
  let year

  if( presentDay() == index) {
    date = presentDate.getDate()
    month = presentDate.getMonth() + 1
    year = presentDate.getFullYear()
  }

  if( presentDay() - index == 1) {
    newDate.setDate(newDate.getDate() + 6)
    date = newDate.getDate()
    month = newDate.getMonth() + 1
    year = newDate.getFullYear()
  }

  if( presentDay() - index == 2) {
    newDate.setDate(newDate.getDate() + 5)
    date = newDate.getDate()
    month = newDate.getMonth() + 1
    year = newDate.getFullYear()
  }

  if( presentDay() - index == 3) {
    newDate.setDate(newDate.getDate() + 4)
    date = newDate.getDate()
    month = newDate.getMonth() + 1
    year = newDate.getFullYear()
  } 

  if( presentDay() - index == 4) {
    newDate.setDate(newDate.getDate() + 3)
    date = newDate.getDate()
    month = newDate.getMonth() + 1
    year = newDate.getFullYear()
  }

  if( presentDay() - index == 5) {
    newDate.setDate(newDate.getDate() + 2)
    date = newDate.getDate()
    month = newDate.getMonth() + 1
    year = newDate.getFullYear()
  }

  if( presentDay() - index == 6) {
    newDate.setDate(newDate.getDate() + 1)
    date = newDate.getDate()
    month = newDate.getMonth() + 1
    year = newDate.getFullYear()
  }

  if( presentDay() + 1 == index ) {
    newDate.setDate(newDate.getDate() + 1)
    date = newDate.getDate()
    month = newDate.getMonth() + 1
    year = newDate.getFullYear()
  }

  if( presentDay() + 2 == index ) {
    newDate.setDate(newDate.getDate() + 2)
    date = newDate.getDate()
    month = newDate.getMonth() + 1
    year = newDate.getFullYear()
  }

  if( presentDay() + 3 == index )  {
    newDate.setDate(newDate.getDate() + 3)
    date = newDate.getDate()
    month = newDate.getMonth() + 1
    year = newDate.getFullYear()
  }

  if( presentDay() + 4 == index )  {
    newDate.setDate(newDate.getDate() + 4)
    date = newDate.getDate()
    month = newDate.getMonth() + 1
    year = newDate.getFullYear()
  }

  if( presentDay() + 5 == index )  {
    newDate.setDate(newDate.getDate() + 5)
    date = newDate.getDate()
    month = newDate.getMonth() + 1
    year = newDate.getFullYear()
  }

  if( presentDay() + 6 == index )  {
    newDate.setDate(newDate.getDate() + 6)
    date = newDate.getDate()
    month = newDate.getMonth() + 1
    year = newDate.getFullYear()
  }

  if( presentDay() + 7 == index )  {
    newDate.setDate(newDate.getDate() + 7)
    date = newDate.getDate()
    month = newDate.getMonth() + 1
    year = newDate.getFullYear()
  }

  if(date < 10) date = `0${date}`
  if( month < 10) month = `0${month}`

  dateString = `${date}.${month}.${year}`

  return dateString
}
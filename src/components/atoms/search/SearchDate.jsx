import { useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { es } from 'date-fns/locale'
import Buttons from '../Buttons'

const SearchDate = ({ onDatesChange }) => {
  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)
  const [showCalendar, setShowCalendar] = useState(false)

  const handleDateChange = (dates) => {
    const [start, end] = dates
    setStartDate(start)
    setEndDate(end)
    onDatesChange({ startDate: start, endDate: end })
  }

  const toggleCalendar = () => setShowCalendar(!showCalendar)

  const formatDate = (date) => {
    if (!date) return 'Agregar fecha'
    return new Intl.DateTimeFormat('es-ES').format(date)
  }

  const selectSingleDay = () => {
    const start = startDate || new Date()
    const end = new Date(start.getTime() + 24 * 60 * 60 * 1000)
    setStartDate(start)
    setEndDate(end)
    onDatesChange({ startDate: start, endDate: end })
    setShowCalendar(false)
  }

  const selectWeek = () => {
    const start = startDate || new Date()
    const end = new Date(start.getTime() + 5 * 24 * 60 * 60 * 1000)
    setStartDate(start)
    setEndDate(end)
    onDatesChange({ startDate: start, endDate: end })
    setShowCalendar(false)
  }

  const selectMonth = () => {
    const start = startDate || new Date()
    const end = new Date(start.getTime() + 30 * 24 * 60 * 60 * 1000)
    setStartDate(start)
    setEndDate(end)
    onDatesChange({ startDate: start, endDate: end })
    setShowCalendar(false)
  }

  return (
    <div className="relative border-x searchDate">
      <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4">
        <button type="button" className="flex items-center txt-tertiary btn g-5" onClick={toggleCalendar}>
          <i className="txt-primary fa-solid fa-calendar title"></i>
          <span className="grid place-items-start">
            <strong>Entrega</strong> {startDate ? formatDate(startDate) : 'Ingresa fecha'}
          </span>
        </button>
        <button type="button" className="flex items-center txt-tertiary btn g-5" onClick={toggleCalendar}>
          <i className="txt-primary fa-solid fa-calendar title"></i>
          <span className="grid place-items-start">
            <strong>Devolución</strong> { endDate ? formatDate(endDate) : 'Ingresa fecha' }
          </span>
        </button>
      </div>
      {showCalendar && (
        <div className="absolute bg-white shadow-lg br-15 z-10 w-full md:w-auto calendar">
          <DatePicker
            selected={startDate}
            onChange={handleDateChange}
            startDate={startDate}
            endDate={endDate}
            selectsRange
            showDisabledMonthNavigation
            monthsShown={2}
            minDate={new Date()}  // Deshabilitar días pasados
            placeholderText="Selecciona un rango de fechas"
            inline  // Mostrar calendario embebido
            locale={es}
            // closeOnScroll={toggleCalendar}
            calendarContainer={({ children }) => (
              <div className="grid rounded-lg">
                <div className='flex flex-col md:flex-row g-5'>
                  {children}
                </div>
                <div className="flex justify-center p-15 g-5">
                  <Buttons text={'x día'} bColor='#A62639' color='#fff' bgColor='#A62639' onClick={selectSingleDay} />
                  <Buttons text={'x semana'} bColor='#A62639' color='#fff' bgColor='#A62639' onClick={selectWeek} />
                  <Buttons text={'x mes'} bColor='#A62639' color='#fff' bgColor='#A62639' onClick={selectMonth} />
                </div>
              </div>
            )}
          />
        </div>
      )}
    </div>
  )
}

export default SearchDate
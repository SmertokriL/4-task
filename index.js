// Вариант №1:

button.addEventListener('click', () => {
  Promise.resolve().then(() => console.log('Microtask 1'))
  console.log('Listener 1')
})

button.addEventListener('click', () => {
  Promise.resolve().then(() => console.log('Microtask 2'))
  console.log('Listener 2')
})

//1. Запускаем скрипт кликом по button и в стеке появляется первый Listener
//2. Планируем наш промис - микротаску, направляется  в jobsQueue. Но не выполняется, потому что стек не пуст.
//3! Далее выполняется синхронный console.log и выводится 'Listener 1'
//4! Стек освободился и после этого выполняется микротаска в jobsQueue, выводится 'Microtask1'
//5. Далее по коду в стек поступает второй listener.
//6. Планируем промис - микротаску, направляется в jobsQueue. Стек не пустой, поэтому ждет.
//7! Синхронное выполнение console.log и выводится 'Listener 2'
//8! Стек освободился, выполняется микротаска в очереди. Вывод 'Microtask2'

// Итог вывод:
// 1. 'Listener1'
// 2. 'Microtask1'
// 3. 'Listener2'
// 4. 'Microtask2'

//Вариант  №2

button.addEventListener('click', () => {
  Promise.resolve().then(() => console.log('Microtask 1'))
  console.log('Listener 1')
})
button.addEventListener('click', () => {
  Promise.resolve().then(() => console.log('Microtask 2'))
  console.log('Listener 2')
})

button.click()

//1. Запускается click и в стеке появляется первый метод click()
//2. Сразу же после этого в стек поступает первый Listener. По принципу работы стека LIFO, начинает выполнятся код первого Listener
//3. Планируем промис - микротаск, направляется в jobsQueue. Ожидает в очереди и не выполняется, потому что стек пока не пуст.
//4! Выполняется синхронный console.log и выводится 'Listener 1'
//5. Т.к первый listener отработал, он выходит из стека. Теперь в стеке остается только click()
//6. Т.к стек не пустой, мы не можем выполнить микротаски как в первом примере. По коду в стек добавляется второй Listener. Теперь в стеке опять две задачи.
//7. Планируем второй промис- микротаск, направляется в jobsQueue. Сейчас у нас в очереди две задачи в jobsQueue, которые хранятся по принципу FIFO
//8! Выполняем синхронный console.log и выводится 'listener 2'
//9. Второй Listener отработал и выходит из стека.
//10. click() тоже отработал и тоже выходит из стека.
//11! Т.к стек пуст мы можем выполнить наши микрозадачи. Выполняем первый в очереди промис и выводим 'Microtask1'
//12! Выполняем второй промис и выводим 'Microtask2'

//Итоговый вывод
//1. 'Listener1 '
//2. 'Listener2'
//3.  'Microtask1'
//4. 'Microtask2'

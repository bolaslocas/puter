"use client"

import { useState } from "react"

export function Calculator() {
  const [display, setDisplay] = useState("0")
  const [previousValue, setPreviousValue] = useState<number | null>(null)
  const [operation, setOperation] = useState<string | null>(null)
  const [waitingForOperand, setWaitingForOperand] = useState(false)

  const inputNumber = (num: string) => {
    if (waitingForOperand) {
      setDisplay(num)
      setWaitingForOperand(false)
    } else {
      setDisplay(display === "0" ? num : display + num)
    }
  }

  const inputOperation = (nextOperation: string) => {
    const inputValue = Number.parseFloat(display)

    if (previousValue === null) {
      setPreviousValue(inputValue)
    } else if (operation) {
      const currentValue = previousValue || 0
      const newValue = calculate(currentValue, inputValue, operation)

      setDisplay(String(newValue))
      setPreviousValue(newValue)
    }

    setWaitingForOperand(true)
    setOperation(nextOperation)
  }

  const calculate = (firstValue: number, secondValue: number, operation: string) => {
    switch (operation) {
      case "+":
        return firstValue + secondValue
      case "-":
        return firstValue - secondValue
      case "×":
        return firstValue * secondValue
      case "÷":
        return firstValue / secondValue
      case "=":
        return secondValue
      default:
        return secondValue
    }
  }

  const performCalculation = () => {
    const inputValue = Number.parseFloat(display)

    if (previousValue !== null && operation) {
      const newValue = calculate(previousValue, inputValue, operation)
      setDisplay(String(newValue))
      setPreviousValue(null)
      setOperation(null)
      setWaitingForOperand(true)
    }
  }

  const clear = () => {
    setDisplay("0")
    setPreviousValue(null)
    setOperation(null)
    setWaitingForOperand(false)
  }

  const Button = ({ onClick, className = "", children }: any) => (
    <button
      onClick={onClick}
      className={`h-12 text-lg font-medium rounded hover:bg-opacity-80 transition-colors ${className}`}
    >
      {children}
    </button>
  )

  return (
    <div className="h-full bg-gray-900 text-white p-4">
      <div className="bg-black p-4 rounded mb-4 text-right">
        <div className="text-2xl font-mono">{display}</div>
      </div>

      <div className="grid grid-cols-4 gap-2">
        <Button onClick={clear} className="bg-gray-600 col-span-2">
          Clear
        </Button>
        <Button onClick={() => inputOperation("÷")} className="bg-orange-500">
          ÷
        </Button>
        <Button onClick={() => inputOperation("×")} className="bg-orange-500">
          ×
        </Button>

        <Button onClick={() => inputNumber("7")} className="bg-gray-700">
          7
        </Button>
        <Button onClick={() => inputNumber("8")} className="bg-gray-700">
          8
        </Button>
        <Button onClick={() => inputNumber("9")} className="bg-gray-700">
          9
        </Button>
        <Button onClick={() => inputOperation("-")} className="bg-orange-500">
          -
        </Button>

        <Button onClick={() => inputNumber("4")} className="bg-gray-700">
          4
        </Button>
        <Button onClick={() => inputNumber("5")} className="bg-gray-700">
          5
        </Button>
        <Button onClick={() => inputNumber("6")} className="bg-gray-700">
          6
        </Button>
        <Button onClick={() => inputOperation("+")} className="bg-orange-500">
          +
        </Button>

        <Button onClick={() => inputNumber("1")} className="bg-gray-700">
          1
        </Button>
        <Button onClick={() => inputNumber("2")} className="bg-gray-700">
          2
        </Button>
        <Button onClick={() => inputNumber("3")} className="bg-gray-700">
          3
        </Button>
        <Button onClick={performCalculation} className="bg-orange-500 row-span-2">
          =
        </Button>

        <Button onClick={() => inputNumber("0")} className="bg-gray-700 col-span-2">
          0
        </Button>
        <Button onClick={() => inputNumber(".")} className="bg-gray-700">
          .
        </Button>
      </div>
    </div>
  )
}

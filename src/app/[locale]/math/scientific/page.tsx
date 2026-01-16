'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import LocaleSwitcher from '@/components/LocaleSwitcher';

export default function ScientificCalculator() {
  const t = useTranslations('math.scientific');
  const tc = useTranslations('common');
  
  const [display, setDisplay] = useState<string>('0');
  const [expression, setExpression] = useState<string>('');
  const [showScientific, setShowScientific] = useState<boolean>(true);

  const buttons = [
    ['C', '(', ')', '÷'],
    ['7', '8', '9', '×'],
    ['4', '5', '6', '-'],
    ['1', '2', '3', '+'],
    ['0', '.', '±', '='],
  ];

  const sciButtons = [
    ['sin', 'cos', 'tan', 'log'],
    ['ln', 'π', 'e', '^'],
    ['√', 'x²', '!', '%'],
  ];

  const handleNumber = (num: string) => {
    if (display === '0' || display === 'Error') {
      setDisplay(num);
    } else {
      setDisplay(display + num);
    }
    setExpression(expression + num);
  };

  const handleOperator = (op: string) => {
    let mapped = op;
    if (op === '×') mapped = '*';
    if (op === '÷') mapped = '/';
    setDisplay(display + op);
    setExpression(expression + mapped);
  };

  const handleClear = () => {
    setDisplay('0');
    setExpression('');
  };

  const handleEquals = () => {
    try {
      // Replace special functions
      let expr = expression
        .replace(/sin\(/g, 'Math.sin((Math.PI/180)*')
        .replace(/cos\(/g, 'Math.cos((Math.PI/180)*')
        .replace(/tan\(/g, 'Math.tan((Math.PI/180)*')
        .replace(/log\(/g, 'Math.log10(')
        .replace(/ln\(/g, 'Math.log(')
        .replace(/π/g, 'Math.PI')
        .replace(/e(?![x])/g, 'Math.E')
        .replace(/√\(/g, 'Math.sqrt(')
        .replace(/\^/g, '**');
      
      // eslint-disable-next-line no-eval
      const result = eval(expr);
      setDisplay(String(result));
      setExpression(String(result));
    } catch {
      setDisplay('Error');
      setExpression('');
    }
  };

  const handleScientific = (func: string) => {
    switch (func) {
      case 'sin':
      case 'cos':
      case 'tan':
      case 'log':
      case 'ln':
      case '√':
        setDisplay(display + func + '(');
        setExpression(expression + func + '(');
        break;
      case 'π':
        setDisplay(display === '0' ? 'π' : display + 'π');
        setExpression(expression + 'π');
        break;
      case 'e':
        setDisplay(display === '0' ? 'e' : display + 'e');
        setExpression(expression + 'e');
        break;
      case '^':
        setDisplay(display + '^');
        setExpression(expression + '^');
        break;
      case 'x²':
        setExpression(`(${expression})**2`);
        handleEquals();
        break;
      case '!':
        const n = parseInt(display);
        if (!isNaN(n) && n >= 0) {
          let fact = 1;
          for (let i = 2; i <= n; i++) fact *= i;
          setDisplay(String(fact));
          setExpression(String(fact));
        }
        break;
      case '%':
        setExpression(`(${expression})/100`);
        handleEquals();
        break;
    }
  };

  const handleButton = (btn: string) => {
    if (btn === 'C') handleClear();
    else if (btn === '=') handleEquals();
    else if (btn === '±') {
      if (display.startsWith('-')) {
        setDisplay(display.slice(1));
      } else {
        setDisplay('-' + display);
      }
    }
    else if ('0123456789.'.includes(btn)) handleNumber(btn);
    else if ('+-×÷()'.includes(btn)) handleOperator(btn);
  };

  return (
    <div className="bg-white text-gray-900 font-sans antialiased flex flex-col min-h-screen">
      <header className="flex items-center justify-between border-b border-gray-200 px-6 md:px-12 py-4 bg-white sticky top-0 z-50">
        <div className="flex items-center gap-10">
          <Link href="/" className="flex items-center gap-3">
            <div className="size-8 rounded-full bg-black text-white flex items-center justify-center">
              <span className="material-symbols-outlined text-[20px]">calculate</span>
            </div>
            <h2 className="text-lg font-semibold tracking-tight">EasyCalc</h2>
          </Link>
          <nav className="hidden md:flex items-center gap-8">
            <Link className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors" href="/">{tc('home')}</Link>
            <Link className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors" href="/finance">{tc('finance')}</Link>
            <Link className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors" href="/life">{tc('life')}</Link>
            <Link className="text-sm font-medium text-gray-900 transition-colors" href="/math">{tc('math')}</Link>
            <Link className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors" href="/unit">{tc('unit')}</Link>
            <Link className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors" href="/currency">{tc('currency')}</Link>
          </nav>
        </div>
        <div className="flex items-center gap-6">
          <div className="hidden md:flex items-center border-b border-gray-200 focus-within:border-black transition-colors px-2 py-1">
            <span className="material-symbols-outlined text-[18px] text-gray-400">search</span>
            <input className="w-32 border-none bg-transparent p-1 text-sm focus:ring-0 placeholder:text-gray-300 outline-none" placeholder={tc('searchShort')} type="text"/>
          </div>
          <LocaleSwitcher />
          <button className="text-sm font-semibold px-4 py-2 rounded-full hover:bg-gray-50 transition-colors">{tc('signIn')}</button>
        </div>
      </header>
      
      <main className="flex-1 flex justify-center py-12 px-4 md:px-10 lg:px-20">
        <div className="flex flex-col max-w-[600px] flex-1 w-full gap-8">
          <div className="flex flex-col gap-4 text-center md:text-left border-b border-gray-100 pb-10">
            <div className="flex flex-wrap gap-2 justify-center md:justify-start mb-2">
              <Link href="/math" className="text-xs font-medium text-gray-500 uppercase tracking-wider hover:text-gray-900">{tc('math')}</Link>
              <span className="text-xs font-medium text-gray-300">/</span>
              <span className="text-xs font-medium text-gray-900 uppercase tracking-wider">{t('title')}</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-light tracking-tight text-gray-900">{t('title')}</h1>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 shadow-lg overflow-hidden">
            <div className="bg-gray-50 p-6 border-b border-gray-100">
              <div className="text-right">
                <p className="text-sm text-gray-400 h-5 font-mono">{expression || ' '}</p>
                <p className="text-4xl font-light tracking-tight text-gray-900 mt-2">{display}</p>
              </div>
            </div>

            <div className="p-4">
              <div className="flex justify-end mb-4">
                <button 
                  onClick={() => setShowScientific(!showScientific)}
                  className={`text-xs font-medium px-3 py-1 rounded-full transition-colors ${showScientific ? 'bg-black text-white' : 'bg-gray-100 text-gray-600'}`}
                >
                  Scientific
                </button>
              </div>

              {showScientific && (
                <div className="grid grid-cols-4 gap-2 mb-4">
                  {sciButtons.flat().map((btn) => (
                    <button
                      key={btn}
                      onClick={() => handleScientific(btn)}
                      className="p-3 text-sm font-medium text-gray-700 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      {btn}
                    </button>
                  ))}
                </div>
              )}

              <div className="grid grid-cols-4 gap-2">
                {buttons.flat().map((btn) => {
                  const isOperator = '+-×÷='.includes(btn);
                  const isClear = btn === 'C';
                  return (
                    <button
                      key={btn}
                      onClick={() => handleButton(btn)}
                      className={`p-4 text-lg font-medium rounded-lg transition-colors ${
                        btn === '=' ? 'bg-black text-white hover:bg-gray-800' :
                        isClear ? 'bg-red-50 text-red-600 hover:bg-red-100' :
                        isOperator ? 'bg-gray-100 text-gray-900 hover:bg-gray-200' :
                        'bg-white text-gray-900 border border-gray-200 hover:bg-gray-50'
                      }`}
                    >
                      {btn}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

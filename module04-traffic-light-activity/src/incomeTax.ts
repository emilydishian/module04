// income tax example

export {}  // make this a self-contained module

// using conditionals
function grossTax(income: number): number {
    if ((income >= 0) && (income <= 10000)) { return 0 }
    if ((income > 10000) && (income <= 20000)) 
    { return 0.10 * (income - 10000) }
    if ((income > 20000) && (income <= 50000)) 
    { return grossTax(20000) + 0.20 * (income - 20000) }
     return grossTax(50000) + 0.25 * (income - 50000) 
}

// represents a tax bracket for income lower < income <= upper.
// if upper is null, then lower < income  (no upper bound)
type Bracket = {
    lower: number,
    upper: number | null,  
    base : number
    rate : number

}

// defines the incomes covered by a bracket
function isInBracket(income:number, bracket:Bracket) : boolean {
    if (bracket.upper == null) 
    { return (bracket.lower < income) }
     return ((bracket.lower < income) && (income <= bracket.upper)) }

function taxByBracket(income: number, bracket: Bracket): number {
    return bracket.base + bracket.rate * (income - bracket.lower)
}

     
// represents a tax table as an array of brackets.
// INVARIANT:  (see below)     
type TaxTable = Bracket[]

/** INVARIANT:
 * 1. the brackets are a non-overlapping partition of the positive real numbers
 * 2. the tax associated with the upper bound of a bracket is 
 *    the same as the tax associated with the lower bound 
 *    of the next higher bracket.
 */

/** NOTE:
 * because the brackets are a non-overlapping partition of the positive real numbers,
 * the brackets need not be sorted by lower bound.  
 */



// because the brackets are a non-overlapping partition of the positive real numbers,
// there will be a unique bracket for each income, so the "as Bracket" cast is safe. */
function income2bracket(income: number, table: TaxTable): Bracket {
    return table.find(b0 => isInBracket(income, b0)) as Bracket
}

function grossTax2 (income:number, brackets: Bracket[] ) : number {
    return taxByBracket(income,income2bracket(income,brackets))
}
    
const table1 : TaxTable = [
    {lower:0,     upper:10000, base:0, rate:0},
    {lower:10000, upper:20000, base:0, rate:0.10},
    {lower:20000, upper:50000, base:1000, rate:0.20},
    {lower:50000, upper: null, base:7000, rate:0.25}
]


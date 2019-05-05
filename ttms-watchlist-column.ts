# Squeeze watchlist column
#   Red Background   - Squeeze is building in the time period - number indicates how many dots
#      w/ white "B"  - Squeeze is building, stock is within "buy zone"
#   Green Background - Squeeze has fired - number indicates how many dots (up to 5 dots)
#                      and whether Squeeze fired L(ong) or S(hort)
#   Black Background - No Squeeze in play

# Original code by Eric Purdy of Simpler Trading 2017
# Modified code by Rich Stratmann to put in background colors and shorten column values
# Updates by dmccuskey
#   - change background colors to aid content scanning
#   - add "B" to time frames which are in the Buy Zone - between 8 & 21 EMA
#   - change "0" to " " <space> so that the content doesn't show when row is highlighted

ToS Share Code: http://tos.mx/IPrEhH

def sqz = !TTM_Squeeze().SqueezeAlert;
def direction = TTM_Squeeze()>TTM_Squeeze()[1];
def count = if sqz and !sqz[1] then 1 else count[1]+1;
def isFired = if !sqz and sqz[1] then 1 else 0;
def firedCount = if isFired then 1 else firedCount[1]+1;
def firedDirection = if isFired then direction else firedDirection[1];

def sumIsFired = sum(isFired,5);
def isFiredDir = sumIsFired && firedDirection;

# look for close buy zone
def ema8 = reference movAvgExponential(length=8);
def ema21 = reference movAvgExponential(length=21);
def currPrice = close();
def highVal = Max(ema8, ema21);
def lowVal = Min(ema8, ema21);
def inBuyZone = currPrice >= lowVal && currPrice <= highVal;

def sqzBuy = sqz && inBuyZone;
def sqzNoBuy = sqz && !inBuyZone;

addLabel(yes, Concat(if sqzBuy then "B " else "", if sqz then "" + count else if sumIsFired then “” + firedCount + if firedDirection then ” L” else ” S” else “ ”), if sqzBuy then color.white else color.black);

AssignBackgroundColor(if sqzNoBuy then  CreateColor(170, 6, 0) else if sqzBuy then color.red else if sumIsFired then CreateColor(28, 105, 3) else color.black);

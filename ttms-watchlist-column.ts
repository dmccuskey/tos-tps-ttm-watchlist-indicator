# Squeeze watchlist column
#     Red Backgrnd - Squeeze is firing in the time period - number indicates how many dots
#   Green Backgrd - Squeeze has fired up to 5 dots - number indicates how many dots
#                   and whether Squeeze fired L(ong) or S(hort)
#   Black Backgrd - No Squeeze in play

# Original code by Eric Purdy of Simpler Trading 2017
# Modified code by Rich Stratmann to put in background colors and shorten column values

# Shared Link -   http://tos.mx/5cpgKa
def sqz = !TTM_Squeeze().SqueezeAlert;
def direction = TTM_Squeeze()>TTM_Squeeze()[1];
def count = if sqz and !sqz[1] then 1 else count[1]+1;
def fired = if !sqz and sqz[1] then 1 else 0;
def firedCount = if fired then 1 else firedCount[1]+1;
def firedDirection = if fired then direction else firedDirection[1];
# addLabel(yes, if sqz then “Squeeze:” + count else if sum(fired,5) then “Fired:” + firedCOunt + if firedDirection then ” Long” else ” Short” else “-”, if sqz then color.red else if sum(fired,5) and firedDirection then color.green else color.orange);

addLabel(yes, if sqz then "" + count else if sum(fired,5) then “” + firedCOunt + if firedDirection then ” L” else ” S” else “” + 0, if sqz then color.white else if sum(fired,5) and firedDirection then color.black else color.black);

AssignBackgroundColor(if sqz then color.red else if sum(fired,5)then color.green else color.black);

import sys
import json

if len(sys.argv) != 7:
    print("Usage: python python-script.py daily_vol_alch num_customer zip_code Liquidity Revenue Expenses")
    sys.exit(1)

daily_vol_alch, num_customer, zip_code, Liquidity, Revenue, Expenses = sys.argv[1:]

# Process the received data
result_data = {
    "daily_vol_alch": daily_vol_alch,
    "num_customer": num_customer,
    "zip_code": zip_code,
    "Liquidity": Liquidity,
    "Revenue": Revenue,
    "Expenses": Expenses
}

# You can perform calculations or processing with the data and modify 'result_data' accordingly

# Return the result data as a JSON string
print(json.dumps(result_data))

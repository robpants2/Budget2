
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
  		<meta name="viewport" content="width=device-width, initial-scale=1">
  		
  		<!-- CSS -->
		<link rel="stylesheet" href="./css/budgetNEW.css" type="text/css">
		<!-- <link rel="stylesheet" href="./css/calendar.css" type="text/css"> -->

		<!-- JavaScript -->
		<script src="https://code.jquery.com/jquery-3.2.1.js"></script>
		<script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
		<script type="text/javascript" src="./js/budgetNEW.js"></script>
		<!-- <script type="text/javascript" src="./js/calendar.js"></script> -->
		
		<title>Budget</title>
	</head>
	<body>
		<div id="nav-cont">
			<div id="nav-control-cont">
				<div id="nav-control-add-expense" class="control-add-expense nav-control">Add</div>
				<div id="nav-control-spending" class="nav-control">Spend</div>
				<div id="nav-control-transfer" class="nav-control">Transf</div>
				<div id="nav-control-recurring" class="nav-control">Recur</div>
			
			</div>
			<div id="nav-expand-cont" class="nav-expander">
				<div id="nav-expand-arrow">Expnd</div>
			</div>
		</div>
		
		<div id="info-cont">
			<div id="info-nav-control-cont">
				<div id="info-control-add-expense" class="control-add-expense nav-control">Add</div>
				<div id="info-control-spending" class="nav-control">Spend</div>
				<div id="info-control-transfer" class="nav-control">Transf</div>
				<div id="info-control-recurring" class="nav-control">Recur</div>
			</div>
			<div id="info-search-cont">
				<input id="info-search" type="text" name="info-search" placeholder="Search Expenses">
				<input id="info-search-submit" type="button" value="Search">
			</div>
			

			<!-- Accounts -->
			<div id="info-account-cont" class="info-item">
				<div class="info-item-title-cont">
					<span>Title</span>
					<span style="float: right">+</span>
				</div>
				<div class="info-item-head">
					<span>Name</span>
					<span style="float: right;">Balance</span>
				</div>

				<div class="info-item-table">
					<div class="account">
						<div class="account-name">Account Name asdfasdf as df asdf asdf asd fa sdfa sdfa sdf asd f</div>
						<div class="account-balance">
							<div class="account-balance-value">$150.50</div>
							<div class="account-edit">E</div>
						</div>
					</div>
					<div class="account">
						<div class="account-name">Account Name</div>
						<div class="account-balance">
							<div class="account-balance-value">$150.50</div>
							<div class="account-edit">E</div>
						</div>
					</div>
					<div class="account">
						<div class="account-name">Account Name</div>
						<div class="account-balance">
							<div class="account-balance-value">$150.50</div>
							<div class="account-edit">E</div>
						</div>
					</div>

				</div>
			</div>
			

			<!-- Categories -->
			<div id="info-category-cont" class="info-item">
				<div class="info-item-title-cont">
					<span>Title</span>
					<span style="float: right">+</span>
				</div>
				<div class="info-item-head">
					<span>Name</span>
					<span style="float: right;">Budget</span>
				</div>

				<div class="info-item-table">

					<div class="category">
						<div class="category-name">Category Name</div>
						<div class="category-budget">
							<div class="category-budget-value">$200.45</div>
							<div class="category-edit">E</div>
						</div>
						<div class="category-info">
							<div class="category-info-item">
								<div class="category-info-item-month">Feb. 2018: </div>
								<div class="category-info-item-value">$150.20 (90%)</div>
							</div>
							<div class="category-info-item">
								<div class="category-info-item-month">Jan. 2018: </div>
								<div class="category-info-item-value">$150.20 (125%)</div>
							</div>
						</div>
					</div>
					<div class="category">
						<div class="category-name">Category Name</div>
						<div class="category-budget">
							<div class="category-budget-value">$200.45</div>
							<div class="category-edit">E</div>
						</div>
						<div class="category-info">
							<div class="category-info-item">
								<div class="category-info-item-month">Feb. 2018: </div>
								<div class="category-info-item-value">$150.20 (90%)</div>
							</div>
							<div class="category-info-item">
								<div class="category-info-item-month">Jan. 2018: </div>
								<div class="category-info-item-value">$150.20 (125%)</div>
							</div>
						</div>
					</div>
					<div class="category">
						<div class="category-name">Category Name</div>
						<div class="category-budget">
							<div class="category-budget-value">$200.45</div>
							<div class="category-edit">E</div>
						</div>
						<div class="category-info">
							<div class="category-info-item">
								<div class="category-info-item-month">Feb. 2018: </div>
								<div class="category-info-item-value">$150.20 (90%)</div>
							</div>
							<div class="category-info-item">
								<div class="category-info-item-month">Jan. 2018: </div>
								<div class="category-info-item-value">$150.20 (125%)</div>
							</div>
						</div>
					</div>

				</div>
			</div>
		
		</div>

		<!-- Expenses -->
		<div id="expenses-cont">
			<!-- <div class="nav-expander" style="position: absolute; top: 0px; right: 0px; width: 50px; height: 50px; background-color: red;"></div> -->

			<div id="expenses-table">
				<div id="expenses-heading">
					<div id="expenses-heading-nav-expander" class="nav-expander"></div>
					<div id="expenses-heading-name">Checking</div>
					<div id="expenses-heading-type">Account</div>
				</div>
			</div>

		</div>

		<!-- Forms -->
		<div id="form-cont">

			<div id="form-add-expense" class="form">
				<div class="form-title">Add Item</div>
				<div class="form-heading">Date</div>
				<input class="form-input form-date" type="text" value="12/31/2017">
				<input type="button" class="button cal-button" value="Cal">
				<div class="form-heading">Description</div>
				<input class="form-input" type="text" value="Description">
				<div class="form-heading">Amount</div>
				<input class="form-input" type="text" value="125.50">
				<div class="form-heading">Category</div>
				<select class="form-input form-category">
					<option value="1">Misc</option>
					<option value="2">Groceries</option>
					<option value="3">Rent</option>
				</select>
				<div class="form-new-cat-box">
					<div class="form-new-cat-cont">
						<div class="form-heading">Name</div>
						<input class="form-input" type="text" value="">
						<div class="form-heading">Budget (optional)</div>
						<input class="form-input" type="text" value="">
						<div class="form-heading">Category Type</div>
						<select class="form-input">
							<option value="0">Spending</option>
							<option value="1">Deposit</option>
						</select>
					</div>
				</div>
				<input class="form-button-new-cat form-input" type="button" value="Create New Category">
				<div class="form-buttons">
					<input class="form-button-cancel button" type="button" value="Cancel">
					<input class="form-button-submit button" type="button" value="Submit">
				</div>
			</div>


		</div>
		

		<div id="overlay-back"></div>
	</body>
</html>
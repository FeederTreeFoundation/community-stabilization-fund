import React from "react";

// Form Responses As Prop Arguments
function ItemChecklistByRecipientAndBag() {
	return (
		<div id="item-checklist" className="item-checklist-wrapper">
			<div className="user-information">
				<p>Name: </p>
				<p>Phone Number:</p>
				<p>Address:<a></a></p>
				<p>Distribution Method:</p>
				<p>COVID concern?<span className="bolded"></span></p>
			</div>

			<table className="table-information" >
				<thead>
					<tr >
						<th>Grocery Items Bag</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>
							<ul >
							<li></li>
							<li></li>
							<li></li>
							</ul>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	);
};

export { ItemChecklistByRecipientAndBag };
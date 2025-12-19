// CRUD App using jQuery and JSONPlaceholder API
const API_BASE_URL = 'https://jsonplaceholder.typicode.com/posts';
let editingId = null;

$(document).ready(function() {
    // Load products on page load
    loadProducts();

    // Form submission
    $('#productForm').on('submit', function(e) {
        e.preventDefault();
        if (editingId) {
            updateProduct();
        } else {
            createProduct();
        }
    });

    // Cancel edit
    $('#cancelBtn').on('click', function() {
        resetForm();
    });

    // Refresh button
    $('#refreshBtn').on('click', function() {
        loadProducts();
    });
});

// Show loading indicator
function showLoading() {
    $('#loadingIndicator').show();
    $('#productsList').hide();
    $('#noProducts').hide();
}

// Hide loading indicator
function hideLoading() {
    $('#loadingIndicator').hide();
    $('#productsList').show();
}

// Show toast notification
function showToast(title, message, type = 'success') {
    $('#toastTitle').text(title);
    $('#toastBody').text(message);
    const toast = new bootstrap.Toast(document.getElementById('toast'));
    toast.show();
}

// Load all products (Read)
function loadProducts() {
    showLoading();
    
    $.ajax({
        url: API_BASE_URL,
        method: 'GET',
        dataType: 'json',
        success: function(products) {
            hideLoading();
            displayProducts(products.slice(0, 20)); // Limit to 20 for demo
        },
        error: function(xhr, status, error) {
            hideLoading();
            showToast('Error', 'Failed to load products: ' + error, 'error');
            $('#noProducts').show();
        }
    });
}

// Display products in table
function displayProducts(products) {
    const tbody = $('#productsTableBody');
    tbody.empty();

    if (products.length === 0) {
        $('#noProducts').show();
        $('#productsList').hide();
        return;
    }

    $('#noProducts').hide();
    $('#productsList').show();

    products.forEach(function(product) {
        const row = `
            <tr>
                <td>${product.id}</td>
                <td>${product.title || 'N/A'}</td>
                <td>$${((product.id * 10) + 9.99).toFixed(2)}</td>
                <td>Category ${product.userId || 'N/A'}</td>
                <td>${(product.body || '').substring(0, 50)}${(product.body || '').length > 50 ? '...' : ''}</td>
                <td>
                    <button class="btn btn-sm btn-primary btn-action" onclick="editProduct(${product.id})">Edit</button>
                    <button class="btn btn-sm btn-danger btn-action" onclick="deleteProduct(${product.id})">Delete</button>
                </td>
            </tr>
        `;
        tbody.append(row);
    });
}

// Create new product
function createProduct() {
    const productData = {
        title: $('#productName').val(),
        body: $('#productDescription').val() || 'Product description',
        userId: 1
    };

    showLoading();

    $.ajax({
        url: API_BASE_URL,
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(productData),
        success: function(response) {
            hideLoading();
            showToast('Success', 'Product created successfully!');
            resetForm();
            loadProducts();
        },
        error: function(xhr, status, error) {
            hideLoading();
            showToast('Error', 'Failed to create product: ' + error, 'error');
        }
    });
}

// Edit product (prefill form)
function editProduct(id) {
    showLoading();
    
    $.ajax({
        url: `${API_BASE_URL}/${id}`,
        method: 'GET',
        success: function(product) {
            hideLoading();
            editingId = id;
            
            // Prefill form
            $('#productId').val(product.id);
            $('#productName').val(product.title || '');
            $('#productPrice').val(((product.id * 10) + 9.99).toFixed(2));
            $('#productCategory').val(`Category ${product.userId || ''}`);
            $('#productDescription').val(product.body || '');
            $('#productImage').val('');
            
            // Update form UI
            $('#formTitle').text('Edit Product');
            $('#submitBtn').text('Update Product');
            $('#cancelBtn').show();
            
            // Scroll to form
            $('html, body').animate({
                scrollTop: $('.card').first().offset().top - 20
            }, 500);
        },
        error: function(xhr, status, error) {
            hideLoading();
            showToast('Error', 'Failed to load product: ' + error, 'error');
        }
    });
}

// Update product
function updateProduct() {
    const productData = {
        id: editingId,
        title: $('#productName').val(),
        body: $('#productDescription').val() || 'Product description',
        userId: 1
    };

    showLoading();

    $.ajax({
        url: `${API_BASE_URL}/${editingId}`,
        method: 'PUT',
        contentType: 'application/json',
        data: JSON.stringify(productData),
        success: function(response) {
            hideLoading();
            showToast('Success', 'Product updated successfully!');
            resetForm();
            loadProducts();
        },
        error: function(xhr, status, error) {
            hideLoading();
            showToast('Error', 'Failed to update product: ' + error, 'error');
        }
    });
}

// Delete product
function deleteProduct(id) {
    if (!confirm('Are you sure you want to delete this product?')) {
        return;
    }

    showLoading();

    $.ajax({
        url: `${API_BASE_URL}/${id}`,
        method: 'DELETE',
        success: function() {
            hideLoading();
            showToast('Success', 'Product deleted successfully!');
            loadProducts();
        },
        error: function(xhr, status, error) {
            hideLoading();
            showToast('Error', 'Failed to delete product: ' + error, 'error');
        }
    });
}

// Reset form
function resetForm() {
    editingId = null;
    $('#productForm')[0].reset();
    $('#productId').val('');
    $('#formTitle').text('Add New Product');
    $('#submitBtn').text('Add Product');
    $('#cancelBtn').hide();
}


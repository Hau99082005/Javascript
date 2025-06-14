export const addToCart = async (formData) => {
  try {
    const res = await fetch('/api/cart/add-to-cart', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    if (!res.ok) {
      return {
        success: false,
        message: data.message || 'Có lỗi xảy ra! Vui lòng thử lại',
      };
    }

    return data;
  } catch (error) {
    console.error('Add to cart error:', error);
    return {
      success: false,
      message: 'Có lỗi xảy ra! Vui lòng thử lại',
    };
  }
};

export const getAllCartItems = async (id) => {
  try {
    const res = await fetch(`/api/cart/all-cart-items?id=${id}`, {
      method: 'GET',
    });

    const data = await res.json();

    if (!res.ok) {
      return {
        success: false,
        message: data.message || 'Có lỗi xảy ra! Vui lòng thử lại',
      };
    }

    return data;
  } catch (error) {
    console.error('Get cart items error:', error);
    return {
      success: false,
      message: 'Có lỗi xảy ra! Vui lòng thử lại',
    };
  }
};

export const deleteFromCart = async (id) => {
  try {
    const res = await fetch(`/api/cart/delete-from-cart?id=${id}`, {
      method: 'DELETE',
    });

    const data = await res.json();

    if (!res.ok) {
      return {
        success: false,
        message: data.message || 'Có lỗi xảy ra! Vui lòng thử lại',
      };
    }

    return data;
  } catch (error) {
    console.error('Delete from cart error:', error);
    return {
      success: false,
      message: 'Có lỗi xảy ra! Vui lòng thử lại',
    };
  }
};